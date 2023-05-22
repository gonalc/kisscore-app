import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import type { ICreationUser, IUser } from '../types/users'

export interface ILoginData {
  userKey: string
  password: string
}

interface ILoginResponse {
  jwt: string
  user: IUser
}

const AUTH_URL = `${BASE_URL}/auth`
export const USERS_URL = `${BASE_URL}/users`

export async function signup(payload: ICreationUser): Promise<ILoginResponse> {
  try {
    const url = `${AUTH_URL}/signup`

    const result: AxiosResponse<APIResponse<ILoginResponse>> = await axios.post(url, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}

export async function login(payload: ILoginData): Promise<ILoginResponse> {
  try {
    const url = `${AUTH_URL}/login`

    const result: AxiosResponse<APIResponse<ILoginResponse>> = await axios.post(url, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}

export async function checkToken(token: string): Promise<ILoginResponse> {
  try {
    const url = `${AUTH_URL}/check`

    const result: AxiosResponse<APIResponse<ILoginResponse>> = await axios.post(url, { jwt: token })

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
