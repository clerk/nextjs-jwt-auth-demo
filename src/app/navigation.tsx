import React from 'react'
import { cookies } from 'next/headers'
import { parseToken } from '@/lib/jwt'
import SignOutButton from './sign-out-button'
import Link from 'next/link'

async function Navigation() {
  const cookieStore = await cookies()
  const tokenCookie = await cookieStore.get('token')
  const user = await parseToken(tokenCookie?.value as string)

  console.log(user)

  return (
    <nav className='flex flex-row justify-between items-center border-b-1 border-b-neutral-200 p-6'>
      <div className='flex flex-row gap-2 items-center'>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Padlock Logo" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#2563EB"/>
          <g>
            {/* Padlock body */}
            <rect x="10" y="14" width="12" height="10" rx="3" fill="white"/>
            {/* Padlock shackle */}
            <path d="M12 14V12a4 4 0 1 1 8 0v2" stroke="white" strokeWidth="2" fill="none"/>
            {/* Keyhole */}
            <circle cx="16" cy="19" r="1.2" fill="#2563EB"/>
            <rect x="15.5" y="20.2" width="1" height="2" rx="0.5" fill="#2563EB"/>
          </g>
        </svg>
        Next.js JWT Auth Demo
      </div>

      {user ? (
        <SignOutButton />
      ) : (
        <div className='flex flex-row gap-2'>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
        </div>
      )}
    </nav>
  )
}

export default Navigation