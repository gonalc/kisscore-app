import type { ILeagueToCreate, ILeague, ILeagueWithPlayers } from '@_types/leagues'
import Api from './apiService'

export async function getUserLeagues(userId: number) {
  try {
    const api = new Api('leagues')

    const path = `from-user/${userId}`

    const data = await api.get<ILeagueWithPlayers[]>(path)

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function getSingleLeague(leagueId: number) {
  try {
    const api = new Api('leagues')

    const path = `${leagueId}?include=players`

    const data = await api.get<ILeagueWithPlayers>(path)

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function createLeague(leagueToCreate: ILeagueToCreate) {
  try {
    const api = new Api('leagues')

    const data = await api.post<ILeague>({ path: '', payload: leagueToCreate })

    return data
  } catch (error) {
    throw Error(error)
  }
}
