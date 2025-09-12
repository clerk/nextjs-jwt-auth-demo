import React from 'react'
import Link from 'next/link'
import Logo from './Logo'

async function Navigation() {
  return (
    <nav className='flex flex-row justify-between items-center border-b-1 border-b-neutral-200 p-6'>
      <Link href="/" className='flex flex-row gap-2 items-center'>
        <Logo />
        Next.js JWT Auth Demo
      </Link>

      <div className='flex flex-row gap-2'>
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </div>
    </nav>
  )
}

export default Navigation