import { useEffect, useState } from 'react'
import LeaguesApi from '@api/leagues'
import { ILeagueWithPlayers } from '@_types/leagues'

const leaguesApi = new LeaguesApi()

const useFetchSingleLeague = (leagueId: number) => {
  const [league, setLeague] = useState<ILeagueWithPlayers>()
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)

    const result = await leaguesApi.getSingle(leagueId)

    setLeague(result)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { league, loading, fetch }
}

export default useFetchSingleLeague
