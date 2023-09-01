import { useState } from 'react'
import type { IInvitation, TInvitationCreationPayload } from '@_types/invitations'
import InvitationsApi from '@api/invitations'

const invitationsApi = new InvitationsApi()

const useCreateInvitation = () => {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState<IInvitation | null>(null)

  const create = async (data: TInvitationCreationPayload) => {
    try {
      setLoading(true)

      const result = await invitationsApi.inviteUser(data)

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
