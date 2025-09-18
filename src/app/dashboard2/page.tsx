import { cookies } from 'next/headers'
import { parseToken } from '@/lib/jwt'
import { redirect } from 'next/navigation'
import Chart from '@/components/Chart'

async function DashboardPage() {
  let user
  const token = (await cookies()).get('token')?.value
  if (token) {
    user = await parseToken(token)
  }
  if(!user) {
    redirect('/sign-in')
  }

  return (
    <div>
      <Chart />
    </div>
  )
}

export default DashboardPage