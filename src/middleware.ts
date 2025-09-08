import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.includes("/dashboard")) {
    return redirect("/sign-in")
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/(.*)',
}