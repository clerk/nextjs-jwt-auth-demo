'use server'

import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { RunResult } from 'sqlite3'
import { cookies } from 'next/headers'
import { createToken } from '@/lib/jwt'

const SALT_ROUNDS = 10

// Hashes the password for storing it
async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hash = await bcrypt.hash(password, salt)
  return { hash, salt }
}

// Creates the user record in the database
async function createUserRecord(username: string, hash: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hash],
      function (err: Error, results: RunResult) {
        if (err) {
          reject(err)
        }
        resolve(results?.lastID)
      },
    )
  })
}

interface CheckCountResult extends RunResult {
  count: number
}

async function checkDoesUserExist(username: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.get(
      'select count(*) as count from users where username=?',
      [username],
      (err: Error, results: CheckCountResult) => {
        if (err) {
          reject(err)
        }
        resolve(results.count !== 0)
      },
    )
  })
}

// The action used in the sign-up route
export async function registerUser(username: string, password: string) {
  try {
    const userExists = await checkDoesUserExist(username)
    if (userExists) {
      throw new Error('User with this name already exists')
    }

    // Hash the password
    const { hash } = await hashPassword(password)

    // Create the user record
    const userId = await createUserRecord(username, hash)

    // Create the token and set it in a cookie
    const token = await createToken(userId?.toString(), username as string)
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 3600, // 1 hour in seconds
    })
  } catch (err) {
    throw err
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

// ... Existing code omitted

// Compare the provided password with what's stored in the database
//   and make sure they match.
async function verifyPassword(inputPassword: string, storedHash: string) {
  return await bcrypt.compare(inputPassword, storedHash)
}

export async function signinUser(username: string, password: string) {
  try {
    // Get the user record and verify the provided password matches what's stored
    const user = await fetchUserFromDb(username)
    const isPasswordValid = await verifyPassword(password, user.password_hash as string)
    if (!isPasswordValid) {
      throw new Error('Username and/or password is incorrect')
    }
    if (!user.id || !user.username) {
      console.error('Error parsing user details', user)
      throw new Error('Unknown error')
    }

    // Create the token and set it in a cookie
    const token = await createToken(user.id?.toString(), user.username as string)
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 3600, // 1 hour in seconds
    })
  } catch (err) {
    throw err
  }
}

interface FetchUserResult extends RunResult {
  id?: number
  username?: string
  password_hash?: string
}

// Fetches the user record from the database using the provided username
async function fetchUserFromDb(username: string): Promise<FetchUserResult> {
  return new Promise((resolve, reject) => {
    db.get('select * from users where username=?', [username], (err, results: FetchUserResult) => {
      if (err) {
        reject(err)
      }
      if (!results.id) {
        reject('User not found')
      }
      resolve(results)
    })
  })
}