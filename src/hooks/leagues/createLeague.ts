import { useState } from 'react'
import type { IBaseLeague, ILeague, ILeagueToCreate } from '@_types/leagues'
import LeaguesApi from '@api/leagues'
import { getStoredUser } from '@utils/storage'

const leaguesApi = new LeaguesApi()

const useCreateLeague = () => {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState<ILeague | null>(null)

  const create = async (data: IBaseLeague) => {
    try {
      setLoading(true)

      const loggedUser = await getStoredUser()

      const leagueToCreate: ILeagueToCreate = {
        ...data,
        user: {
          id: loggedUser.id
        }
      }

      const result = await leaguesApi.create(leagueToCreate)

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
