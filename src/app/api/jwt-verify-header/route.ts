import * as jose from 'jose'

const publicKeyPem = process.env.JWT_PUBLIC_KEY as string

async function getPublicKey() {
  return jose.importSPKI(publicKeyPem, 'RS256')
}

export async function POST(req: Request) {  
  // Placeholder for verified JWT claims
  let claims: jose.JWTPayload | null = null

  // Read the Authorization header in a case-insensitive way since header casing can vary by clients/proxies.
  const auth = req.headers.get('authorization') || req.headers.get('Authorization')
  // Ensure the header exists and uses the expected "Bearer <token>" scheme.
  if (!auth || !auth.startsWith('Bearer ')) {
    return new Response(null, { status: 401 })
  }
  // Extract the raw JWT by removing the leading "Bearer " prefix and trimming whitespace.
  const token = auth.slice(7).trim()

  try {
    const publicKey = await getPublicKey()
    const { payload } = await jose.jwtVerify(token, publicKey)
    claims = payload
  } catch (err) {
    console.error('Error parsing token', err)
  }

  if(claims) {
    return new Response(null, { status: 200 })
  } else {
    return new Response(null, { status: 401 })
  }
}
