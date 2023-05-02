import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import { IUserWithLeagues } from '../types/users'
import { USERS_URL } from './auth'
import { IBaseLeague, ILeague } from '../types/leagues'

const LEAGUES_URL = `${BASE_URL}/leagues`

export async function getUserLeagues(userId: number) {
  try {
    const url = `${USERS_URL}/${userId}?include=leagues`

    const result: AxiosResponse<APIResponse<IUserWithLeagues>> = await axios.get(url)

    return result.data.data.leagues
  } catch (error) {
    throw Error(error)
  }
}

export async function createLeague(leagueToCreate: IBaseLeague) {
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
