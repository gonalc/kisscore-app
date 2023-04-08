import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import type { ICreationUser, IUser } from '../types/users'

interface ILoginData {
  email: string
  password: string
}

interface ILoginResponse {
  jwt: string
  user: IUser
}

export async function signup(payload: ICreationUser): Promise<ILoginResponse> {
  try {
    const url = `${BASE_URL}/auth/signup`

    const result: AxiosResponse<APIResponse<ILoginResponse>> = await axios.post(url, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}

export async function login(payload: ILoginData): Promise<ILoginResponse> {
  try {
    const url = `${BASE_URL}/auth/login`

    const result: AxiosResponse<APIResponse<ILoginResponse>> = await axios.post(url, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
