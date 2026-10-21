"use client"
import { useState } from 'react'

type Props = Record<string, never>

type VerifyResponse = {
  ok: boolean
  message: string
  claims?: Record<string, unknown>
}

async function postToken(token: string): Promise<VerifyResponse> {
  const res = await fetch('/api/jwt-verify-header', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // The route responds with a status code and an empty body
  if (res.ok) {
    return { ok: true, message: 'Token is valid' }
  }
  if (res.status === 401) {
    return { ok: false, message: 'Token is invalid' }
  }
  throw new Error(`Request failed with ${res.status}`)
}

function Page({}: Props) {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<string>('')
  const [claims, setClaims] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleVerify() {
    setLoading(true)
    setStatus('')
    setClaims(null)
    try {
      const result = await postToken(token)
      setStatus(result.message)
      setClaims(result.ok ? (result.claims ?? null) : null)
    } catch {
      setStatus('Request failed')
      setClaims(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h1>JWT Verify via Authorization header</h1>
      <label htmlFor="jwt">JWT</label>
      <textarea
        id="jwt"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste JWT here"
        rows={5}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={handleVerify} disabled={loading || !token.trim()}>
          {loading ? 'Verifying…' : 'Send with Authorization header'}
        </button>
      </div>
      {status && (
        <div style={{ marginTop: 12 }}>
          <strong>Status:</strong> {status}
        </div>
      )}
      {claims && (
        <pre style={{ marginTop: 12, background: '#f5f5f5', padding: 12 }}>
          {JSON.stringify(claims, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default Page