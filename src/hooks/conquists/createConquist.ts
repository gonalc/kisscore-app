import { useState } from 'react'
import type { IConquist, IConquistToCreate, ICreationConquist } from '@_types/conquists'
import { getStoredUser } from '@utils/storage'
import { createConquist } from '@api/conquists'

const useCreateConquist = () => {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState<IConquist | null>(null)

  const create = async (data: ICreationConquist) => {
    try {
      setLoading(true)

      const loggedUser = await getStoredUser()

      const conquistToCreate: IConquistToCreate = {
        ...data,
        userId: loggedUser.id
      }

      const result = await createConquist(conquistToCreate)

      setCreated(result)
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, create, created }
}

export default useCreateConquist
