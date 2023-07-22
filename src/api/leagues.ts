import type { ILeagueToCreate, ILeague, ILeagueWithPlayers } from '@_types/leagues'
import Api from './apiService'

const api = new Api('leagues')

export async function getUserLeagues(userId: number) {
  try {
    const path = `from-user/${userId}`

    const data = await api.get<ILeagueWithPlayers[]>(path)

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function getSingleLeague(leagueId: number) {
  try {
    const path = `${leagueId}?include=players`

    const data = await api.get<ILeagueWithPlayers>(path)

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function createLeague(leagueToCreate: ILeagueToCreate) {
  try {
    const data = await api.post<ILeague>({ path: '', payload: leagueToCreate })

    return data
  } catch (error) {
    throw Error(error)
  }
}
