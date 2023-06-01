import { useEffect, useState } from 'react'
import { IUser } from '../../types/users'
import { fetchUser } from '../../api/users'
import type { QueryParams } from '../../api/types'

const useGetSingleUser = (userId: number, params: QueryParams = {}) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)

  const fetch = async (noLoading?: boolean) => {
    if (!noLoading) {
      setLoading(true)
    }

    const result = await fetchUser(userId, params)

    setUser(result)

    if (!noLoading) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return { user, loading, fetch }
}

export default useGetSingleUser
