import type { IBadge } from '@_types/badges'
import Api from './apiService'

class BadgesApi {
  async getAll() {
    try {
      const api = new Api('badges')

      const data = await api.get<IBadge[]>()

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default BadgesApi
