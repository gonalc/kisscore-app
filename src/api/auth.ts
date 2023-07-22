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

const api = new Api('auth')

export async function signup(payload: ICreationUser) {
  try {
    const path = 'signup'

    const data = await api.post<ILoginResponse>({ path, payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function login(payload: ILoginData) {
  try {
    const path = 'login'

    const data = await api.post<ILoginResponse>({ path, payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function checkToken(token: string) {
  try {
    const path = 'check'

    const data = await api.post<ILoginResponse>({ path, payload: { jwt: token } })

    return data
  } catch (error) {
    throw Error(error)
  }
}
