import axios, { type AxiosResponse } from 'axios'
import { type APIResponse, BASE_URL } from './url'
import type { IUser } from '../types/users'
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

export async function updateUser(id: IUser['id'], payload: Partial<IUser>) {
  try {
    const url = `${USERS_URL}/${id}`

    const result: AxiosResponse<APIResponse<IUser>> = await axios.put(url, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
