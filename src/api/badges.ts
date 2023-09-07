import type { IBadge } from '@_types/badges'
import Api from './apiService'

class BadgesApi {
  private getApi() {
    const api = new Api('badges')

    return api
  }

  async getAll() {
    try {
      const api = this.getApi()

      const data = await api.get<IBadge[]>()

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default BadgesApi
