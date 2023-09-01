import type { ICreationUser, IUser } from '@_types/users'
import Api from './apiService'

export interface ILoginData {
  userKey: string
  password: string
}

interface ILoginResponse {
  jwt: string
  user: IUser
}

export async function signup(payload: ICreationUser, referral?: string) {
  try {
    const api = new Api('auth')

    let path = 'signup'

    if (referral) {
      path += `?referral=${referral}`
    }

    const data = await api.post<ILoginResponse>({ path, payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function login(payload: ILoginData) {
  try {
    const api = new Api('auth')

    const path = 'login'

    const data = await api.post<ILoginResponse>({ path, payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function checkToken(token: string) {
  try {
    const api = new Api('auth')

    const path = 'check'

    const data = await api.post<ILoginResponse>({ path, payload: { jwt: token } })

    return data
  } catch (error) {
    throw Error(error)
  }
}
