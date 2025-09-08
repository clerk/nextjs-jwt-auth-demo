'use server'

import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { RunResult } from 'sqlite3';
import { checkIsOnDemandRevalidate } from 'next/dist/server/api-utils';

const SALT_ROUNDS = 10;

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
}

async function verifyPassword(inputPassword: string, storedHash: string) {
    return await bcrypt.compare(inputPassword, storedHash);
}

// TODO: Check for duplicate username
async function createUserRecord(username: string, hash: string): Promise<number> {
  return new Promise((resolve, reject) => {
    // Create db record
    db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash], function (err: Error, results: RunResult) {
      if (err) {
        reject(err)
      }
      console.log('results', results)
      resolve(results?.lastID)
    });
  })
}

interface CheckCountResult extends RunResult {
  count: number
}

async function checkDoesUserExist(username: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.get('select count(*) as count from users where username=?', [username], (err: Error, results: CheckCountResult) => {
      if(err) {
        reject(err)
      }
      resolve(results.count !== 0)
    })
  })
}

export async function registerUser(username: string, password: string) {
  try {
    const userExists = await checkDoesUserExist(username)
    if(userExists) {
      throw new Error("User with this name already exists");
    }

    // Hash the password
    const { hash } = await hashPassword(password)

    // Create the user record
    const userId = await createUserRecord(username, hash)

    return userId

  } catch (err) {
    throw err
  }

}

export async function signinUser(username: string, password: string) {
  // Check creds

  // Mint JWT
}