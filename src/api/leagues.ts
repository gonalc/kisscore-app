import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import { IUserWithLeagues } from '../types/users'

const USERS_URL = `${BASE_URL}/users`

export async function getUserLeagues(userId: number) {
  try {
    const url = `${USERS_URL}/${userId}?include=leagues`

    const result: AxiosResponse<APIResponse<IUserWithLeagues>> = await axios.get(url)

    return result.data.data.leagues
  } catch (error) {
    throw Error(error)
  }
}
