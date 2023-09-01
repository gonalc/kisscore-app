import type { IUser } from '@_types/users'
import type { QueryParams } from './types'
import Api from './apiService'

class UsersApi {
  private getApi() {
    const api = new Api('users')

    return api
  }

  async fetch<T extends IUser>(id: number, params: QueryParams = {}) {
    try {
      const api = this.getApi()

      const data = await api.get<T>(`${id}`, { params })

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async update(id: IUser['id'], payload: Partial<IUser>) {
    try {
      const api = this.getApi()

      const path = `${id}`

      const data = await api.put<IUser>({ path, payload })

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default UsersApi
