'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { signinUser } from '../actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

function SignInPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>()
  const [pass, setPass] = useState<string>()
  const [err, setErr] = useState<string>()

  async function onSignInClicked() {
    if(!username || !pass) {
      setErr("Must specify username and password")
    }
    try {
      await signinUser(username as string, pass as string)
      router.push('/dashboard')
    } catch (err) {
      setErr((err as Error).message)
    }
  }

  return (
    <div className='items-center justify-center align-center flex flex-col p-8'>
      <Card className='flex flex-col gap-2 w-[400px] p-4'>
        <h1>Sign up</h1>
        <Label>Username</Label>
        <Input value={username} onChange={e => setUsername(e.target.value)} />
        <Label>Password</Label>
        <Input type="password" value={pass} onChange={e => setPass(e.target.value)} />
        <Button onClick={onSignInClicked}>Sign in</Button>
        {err &&
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {err}
            </AlertDescription>
          </Alert>
        }
      </Card>
    </div>
  )
}

export default SignInPage