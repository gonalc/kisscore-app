import type { ILeagueToCreate, ILeague, ILeagueWithPlayers } from '@_types/leagues'
import Api from './apiService'

class LeaguesApi {
  private getApi() {
    const api = new Api('leagues')

    return api
  }

  async getUserLeagues(userId: number) {
    try {
      const api = this.getApi()

      const path = `from-user/${userId}`

      const data = await api.get<ILeagueWithPlayers[]>(path)

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async getSingle(leagueId: number) {
    try {
      const api = this.getApi()

      const path = `${leagueId}?include=players`

      const data = await api.get<ILeagueWithPlayers>(path)

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async create(leagueToCreate: ILeagueToCreate) {
    try {
      const api = this.getApi()

      const data = await api.post<ILeague>({ path: '', payload: leagueToCreate })

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default LeaguesApi
