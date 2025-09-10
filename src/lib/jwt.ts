import * as jose from 'jose'

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
  protectedHeader: { alg: 'HS256', typ: 'JWT' },
}

export async function parseToken(token: string): Promise<jose.JWTPayload | null> {
  if (!token) return null

  try {
    const { payload } = await jose.jwtVerify(token, jwtConfig.secret)
    return payload
  } catch (err) {
    console.error('Error parsing token', err)
    return null
  }
}
export async function createToken(sub: string, username: string): Promise<string> {
  try {
    return await new jose.SignJWT({ sub, username })
      .setProtectedHeader(jwtConfig.protectedHeader)
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(jwtConfig.secret)
  } catch (err) {
    console.error('Error creating token', err)
    throw err
  }
}