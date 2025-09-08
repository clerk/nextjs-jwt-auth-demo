import { NextResponse } from 'next/server'
import { signOut } from '../actions'

async function SignOutPage() {
  await signOut()
  return NextResponse.redirect("/")
}

export default SignOutPage