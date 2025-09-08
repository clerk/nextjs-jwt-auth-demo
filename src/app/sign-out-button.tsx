'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from './actions'

function SignOutButton() {
  async function onClick() {
    await signOut()
    window.location.pathname = "/sign-in"
  }

  return (
    <Button onClick={onClick}>
      Sign out
    </Button>
  )
}

export default SignOutButton