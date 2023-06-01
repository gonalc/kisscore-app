import { useEffect, useState } from 'react'
import type { IUser } from '../../types/users'
import { getStoredUser } from '../../utils/storage'

const useGetLocalUser = () => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const loggedUser = await getStoredUser()

      setUser(loggedUser)
    }

    fetch()
  }, [])

  return user
}

export default useGetLocalUser
