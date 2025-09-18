import React from 'react'
import { cookies } from 'next/headers'
import { parseToken } from '@/lib/jwt'
import { redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

async function DashboardLayout({ children }: Props) {
  let user
  const token = (await cookies()).get('token')?.value
  if (token) {
    user = await parseToken(token)
  }
  if(!user) {
    redirect('/sign-in')
  }

  return children
}

export default DashboardLayout