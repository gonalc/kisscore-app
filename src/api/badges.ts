import type { IBadge } from '@_types/badges'
import Api from './apiService'

class BadgesApi {
  private api = new Api('badges')

  async getAll() {
    try {
      const data = await this.api.get<IBadge[]>()

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default BadgesApi
