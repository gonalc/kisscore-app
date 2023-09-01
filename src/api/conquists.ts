import type { IConquist, IConquistToCreate } from '@_types/conquists'
import Api from './apiService'

export async function createConquist(payload: IConquistToCreate) {
  try {
    const api = new Api('conquists')

    const data = await api.post<IConquist>({ payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}
