import type { IConquist, IConquistToCreate } from '@_types/conquists'
import Api from './apiService'

class ConquistsApi {
  private getApi() {
    const api = new Api('conquists')

    return api
  }

  async create(payload: IConquistToCreate) {
    try {
      const api = this.getApi()

      const data = await api.post<IConquist>({ payload })

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async delete(id: IConquist['id']) {
    try {
      const api = this.getApi()

      const data = await api.delete<IConquist>(`${id}`)

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default ConquistsApi
