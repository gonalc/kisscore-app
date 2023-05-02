import { useEffect, useState } from 'react'
import type { ILeague } from '../../types/leagues'
import { getUserLeagues } from '../../api/leagues'
import { getStoredUser } from '../../utils/storage'

const useFetchLeagues = () => {
  const [leagues, setLeagues] = useState<ILeague[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      const user = await getStoredUser()

      const result = await getUserLeagues(user.id)

      setLeagues(result)
      setLoading(false)
    }

    fetch()
  }, [])

  return { leagues, loading }
}

export default useFetchLeagues
