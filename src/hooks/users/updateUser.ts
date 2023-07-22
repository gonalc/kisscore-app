import { useState } from 'react'
import type { IUser } from '@_types/users'
import { updateUser } from '@api/users'

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState<IUser | null>(null)

  const update = async (id: IUser['id'], payload: Partial<IUser>) => {
    try {
      setLoading(true)

      const result: IUser = await updateUser(id, payload)

      setUpdated(result)
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, updated, update }
}

export default useUpdateUser
