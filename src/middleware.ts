import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parseToken } from './lib/jwt'

export async function middleware(request: NextRequest) {
  // Create a variable to hold user details
  let user
  const token = request.cookies.get('token')?.value
  if (token) {
    // Use the `parseToken` helper function to extract the claims into `user`
    user = await parseToken(token)
  }

  // Get the pathname of the requested URL
  const { pathname } = request.nextUrl

  // If there is no user info and the request is to /dashboard, redirect to /sign-in
  if (pathname.includes('/dashboard') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  // If the user is signed in and trying to access the auth routes, redirect them to the home page
  if ((pathname.includes('/sign-in') || pathname.includes('/sign-up')) && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/(.*)',
}