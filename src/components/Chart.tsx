'use client'
import { useEffect, useState } from 'react'

function Chart() {
  const [isLoading, setIsLoading] = useState(true)
  const [requiresAuth, setRequiresAuth] = useState<boolean>()

  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/data')
      if (res.status === 401) {
        setRequiresAuth(true)
      }
      setIsLoading(false)
    }
    loadData()
  }, [])

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if(requiresAuth) {
    return (
      <div>
        You need to sign in to view this component
      </div>
    )
  }

  return (
    <div>
      Chart data
    </div>
  )
}

export default Chart