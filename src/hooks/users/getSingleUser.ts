import { useEffect, useState } from 'react'
import { IUser } from '@_types/users'
import UsersApi from '@api/users'
import type { QueryParams } from '@api/types'

const usersApi = new UsersApi()

const useGetSingleUser = <T extends IUser>(userId: number, params: QueryParams = {}) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<T | null>(null)

  const fetch = async (noLoading?: boolean) => {
    if (!noLoading) {
      setLoading(true)
    }

    const result = await usersApi.fetch<T>(userId, params)

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
