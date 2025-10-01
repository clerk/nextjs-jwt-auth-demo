import React from 'react'
// Read cookies on the server in the App Router
import { cookies } from 'next/headers'
// JOSE is used for standards-compliant JWT crypto/validation
import * as jose from 'jose'

// RS256 public key (PEM/SPKI). Keep this in env, not in code.
const publicKeyPem = process.env.JWT_PUBLIC_KEY as string

async function getPublicKey() {
  // Convert PEM string to a CryptoKey usable by jose.jwtVerify
  return jose.importSPKI(publicKeyPem, 'RS256')
}

async function Page() {
  // Access the cookie store on the server
  const cookieStore = await cookies()
  // JWT expected to be set as a 'token' cookie
  const tokenCookie = await cookieStore.get('token')
  // Use a placeholder for the token claims
  let claims: jose.JWTPayload | null = null

  if(tokenCookie) {
    try {
      const publicKey = await getPublicKey()
      // Verify signature, exp/nbf, and decode claims (throws on failure)
      const { payload } = await jose.jwtVerify(tokenCookie?.value, publicKey)
      claims = payload
    } catch (err) {
      // Treat any verification/parsing error as unauthorized
      console.error('Error parsing token', err)
    }
  }

  if(claims) {
    // Authorized view when token is valid
    return (
      <div>Authorized content</div>
    )
  } else {
    // Fallback when missing/invalid token
    return (
      <div>Unauthorized content</div>
    )
  }
}

export default Page