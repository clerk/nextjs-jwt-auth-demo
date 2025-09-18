
import { parseToken } from '@/lib/jwt'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    let user
    const token = request.cookies.get('token')?.value
    if (token) {
      user = await parseToken(token)
    }
    if(!user) {
      return new Response("", { status: 401 })
    }

  return new Response(JSON.stringify({ "message": "Ok!"}), { status: 200 })
}