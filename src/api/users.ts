import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import { IUser } from '../types/users'
import type { QueryParams } from './types'

const USERS_URL = `${BASE_URL}/users`

export async function fetchUser(id: number, params: QueryParams = {}) {
  try {
    const url = `${USERS_URL}/${id}`

    const result: AxiosResponse<APIResponse<IUser>> = await axios.get(url, {
      params
    })

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
