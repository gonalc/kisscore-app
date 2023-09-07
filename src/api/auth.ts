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

class AuthApi {
  private getApi() {
    const api = new Api('auth')

    return api
  }

  async signup(payload: ICreationUser, referral?: string) {
    try {
      const api = this.getApi()

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

  async login(payload: ILoginData) {
    try {
      const api = this.getApi()

      const path = 'login'

      const data = await api.post<ILoginResponse>({ path, payload })

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async checkToken(token: string) {
    try {
      const api = this.getApi()

      const path = 'check'

      const data = await api.post<ILoginResponse>({ path, payload: { jwt: token } })

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default AuthApi
