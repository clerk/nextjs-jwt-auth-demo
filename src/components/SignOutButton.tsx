'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from '../app/actions'

function SignOutButton() {
  async function onClick() {
    await signOut()
    window.location.pathname = '/'
  }

  return <Button onClick={onClick}>Sign out</Button>
}

export default SignOutButton