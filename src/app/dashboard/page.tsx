import { Card } from '@/components/ui/card'
import React from 'react'
import { cookies } from 'next/headers'
import { parseToken } from '@/lib/jwt'

async function DashboardPage() {
  const cookieStore = await cookies()
  const tokenCookie = await cookieStore.get('token')
  const user = await parseToken(tokenCookie?.value as string)

  return (
    <div className='max-w-800px p-8 flex flex-col gap-4'>
      <div className='flex flex-row justify-between'>
        <h1>Welcome {user?.username}!</h1>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <Card>
          <div className="p-4">
            <div className="text-lg font-semibold">Users</div>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-gray-500">Active this month</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-lg font-semibold">Revenue</div>
            <div className="text-2xl font-bold">$12,345</div>
            <div className="text-sm text-gray-500">This month</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-lg font-semibold">New Signups</div>
            <div className="text-2xl font-bold">321</div>
            <div className="text-sm text-gray-500">Past 7 days</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage