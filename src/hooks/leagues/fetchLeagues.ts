import { useEffect, useState } from 'react'
import type { ILeagueWithPlayers } from '@_types/leagues'
import { getUserLeagues } from '@api/leagues'
import { getStoredUser } from '@utils/storage'

const useFetchLeagues = () => {
  const [leagues, setLeagues] = useState<ILeagueWithPlayers[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)

    const user = await getStoredUser()

    const result = await getUserLeagues(user.id)

    setLeagues(result)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { leagues, loading, fetch }
}

export default useFetchLeagues
