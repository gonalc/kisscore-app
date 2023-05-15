import { useEffect, useState } from 'react'
import { getSingleLeague } from '../../api/leagues'
import { ILeagueWithPlayers } from '../../types/leagues'

const useFetchSingleLeague = (leagueId: number) => {
  const [league, setLeague] = useState<ILeagueWithPlayers>()
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)

    const result = await getSingleLeague(leagueId)

    setLeague(result)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { league, loading, fetch }
}

export default useFetchSingleLeague
