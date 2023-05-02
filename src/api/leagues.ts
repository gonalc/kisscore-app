import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import { IUserWithLeagues } from '../types/users'
import type { ILeagueToCreate, ILeague } from '../types/leagues'

const LEAGUES_URL = `${BASE_URL}/leagues`

export async function getUserLeagues(userId: number) {
  try {
    const url = `${LEAGUES_URL}/from-user/${userId}`

    const result: AxiosResponse<APIResponse<IUserWithLeagues>> = await axios.get(url)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}

export async function createLeague(leagueToCreate: ILeagueToCreate) {
  try {
    const result: AxiosResponse<APIResponse<ILeague>> = await axios.post(
      LEAGUES_URL,
      leagueToCreate
    )

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
