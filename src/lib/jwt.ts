import * as jose from 'jose'

const privateKeyPem = process.env.JWT_PRIVATE_KEY as string
const publicKeyPem = process.env.JWT_PUBLIC_KEY as string

async function getPrivateKey() {
  return jose.importPKCS8(privateKeyPem, 'RS256')
}

async function getPublicKey() {
  return jose.importSPKI(publicKeyPem, 'RS256')
}

const jwtConfig = {
  protectedHeader: { alg: 'RS256', typ: 'JWT' },
}

interface CustomJWTPayload extends jose.JWTPayload {
  username?: string
}

export async function parseToken(token: string): Promise<CustomJWTPayload | null> {
  if (!token) return null

  try {
    const publicKey = await getPublicKey()
    const { payload } = await jose.jwtVerify(token, publicKey)
    // const { payload } = await jose.jwtVerify(token, jwtConfig.secret)
    return payload
  } catch (err) {
    console.error('Error parsing token', err)
    return null
  }
}
export async function createToken(sub: string, username: string): Promise<string> {
  try {
    const privateKey = await getPrivateKey()
    return await new jose.SignJWT({ sub, username })
      .setProtectedHeader(jwtConfig.protectedHeader)
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(privateKey)
  } catch (err) {
    console.error('Error creating token', err)
    throw err
  }
}