import type { IUser } from '../types/users'
import type { QueryParams } from './types'
import Api from './apiService'

const api = new Api('users')

export async function fetchUser<T extends IUser>(id: number, params: QueryParams = {}) {
  try {
    const data = await api.get<T>(`${id}`, { params })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function updateUser(id: IUser['id'], payload: Partial<IUser>) {
  try {
    const path = `${id}`

    const data = await api.put<IUser>({ path, payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}
