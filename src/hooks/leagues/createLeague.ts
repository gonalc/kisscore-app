import { useState } from 'react'
import type { IBaseLeague, ILeague } from '../../types/leagues'
import { createLeague } from '../../api/leagues'

const useCreateLeague = () => {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState<ILeague | null>(null)

  const create = async (leagueToCreate: IBaseLeague) => {
    try {
      setLoading(true)
      const result = await createLeague(leagueToCreate)

      setCreated(result)
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  return { create, loading, created }
}

export default useCreateLeague
