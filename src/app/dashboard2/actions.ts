'use server'

import { cookies } from 'next/headers'
import { parseToken } from '@/lib/jwt'

export async function getChartData() {
  const cookieStore = await cookies()
  const tokenCookie = await cookieStore.get('token')
  const user = await parseToken(tokenCookie?.value as string)

  if(!user) {
    throw new Error("User is unauthorized");
  }

  return {
    "message": "OK!"
  }
}