'use client'
import { useEffect, useState } from 'react'

function Chart() {
  const [isLoading, setIsLoading] = useState(true)
  const [requiresAuth, setRequiresAuth] = useState<boolean>()
  const [data, setData] = useState<any>()

  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/data')
      if (res.status === 401) {
        setRequiresAuth(true)
      } else {
        const json = await res.json()
        setData(json)
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