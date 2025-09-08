import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parseToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  let user;
  const token = request.cookies.get('token')?.value;
  if(token) {
    user = await parseToken(token)
    if (user?.username) {
      request.headers.set('x-username', user.username as string)
    }
  }
  const { pathname } = request.nextUrl

  if(pathname.includes("/dashboard") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  if((pathname.includes("/sign-in") || pathname.includes("/sign-up")) && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/(.*)',
}

// export function middleware(req: NextRequest) {

//     try {
//         jwt.verify(token, process.env.JWT_SECRET!);
//         return NextResponse.next();
//     } catch {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
// }

// export const config = {
//     matcher: ['/dashboard/:path*'],
// };
