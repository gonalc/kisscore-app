import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from '../utils/url'
import type { ICreationUser, IUser } from '../types/users'

export async function signup(payload: ICreationUser): Promise<IUser> {
  try {
    const url = `${BASE_URL}/users`

    const result: AxiosResponse<APIResponse<IUser>> = await axios.post(url, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
