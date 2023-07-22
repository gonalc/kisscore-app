import { useEffect, useState } from 'react'
import { IInvitation } from '@_types/invitations'
import { getStoredUser } from '@utils/storage'
import { getUserInvitations } from '@api/invitations'

const useFetchInvitations = () => {
  const [invitations, setInvitations] = useState<IInvitation[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)

    const user = await getStoredUser()

    const result = await getUserInvitations(user.id)

    setInvitations(result)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { invitations, loading, fetch }
}

export default useFetchInvitations
