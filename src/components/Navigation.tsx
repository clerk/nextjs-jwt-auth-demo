import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import { parseToken } from '@/lib/jwt'
import SignOutButton from './SignOutButton'
import Logo from './Logo'

async function AuthLinks() {
  const cookieStore = await cookies()
  const tokenCookie = await cookieStore.get('token')
  const user = await parseToken(tokenCookie?.value as string)

  return user ? (
    <SignOutButton />
  ) : (
    <div className="flex flex-row gap-2">
      <Link href="/sign-in">Sign in</Link>
      <Link href="/sign-up">Sign up</Link>
    </div>
  )
}

function Navigation() {
  return (
    <nav className='flex flex-row justify-between items-center border-b-1 border-b-neutral-200 p-6'>
      <Link href="/" className='flex flex-row gap-2 items-center'>
        <Logo />
        Next.js JWT Auth Demo
      </Link>

      <Suspense>
        <AuthLinks />
      </Suspense>
    </nav>
  )
}

export default Navigation
