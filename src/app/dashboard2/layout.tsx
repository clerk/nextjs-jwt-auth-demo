import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { parseToken } from '@/lib/jwt'

interface Props {
  children: React.ReactNode
}

async function AuthGate({ children }: Props) {
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

function DashboardLayout({ children }: Props) {
  return (
    <Suspense>
      <AuthGate>{children}</AuthGate>
    </Suspense>
  )
}

export default DashboardLayout
