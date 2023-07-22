import { useState } from 'react'
import { IInvitation } from '@_types/invitations'
import { acceptInvitation, rejectInvitation } from '@api/invitations'

type TActionIvitation = 'accept' | 'reject'

const useConfirmInvitation = () => {
  const [loading, setLoading] = useState(false)

  const confirm = async (action: TActionIvitation, data: IInvitation) => {
    try {
      setLoading(true)

      if (action === 'accept') {
        await acceptInvitation(data)
      } else {
        await rejectInvitation(data.id)
      }
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, confirm }
}

export default useConfirmInvitation
