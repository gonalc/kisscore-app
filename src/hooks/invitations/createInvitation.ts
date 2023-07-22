import { useState } from 'react'
import type { IInvitation, TInvitationCreationPayload } from '@_types/invitations'
import { inviteUser } from '@api/invitations'

const useCreateInvitation = () => {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState<IInvitation | null>(null)

  const create = async (data: TInvitationCreationPayload) => {
    try {
      setLoading(true)

      const result = await inviteUser(data)

      setCreated(result)
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  return { create, loading, created }
}

export default useCreateInvitation
