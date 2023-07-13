import type { IConquistToCreate } from '../types/conquists'
import Api from './apiService'

const api = new Api('conquists')

export async function createConquist(payload: IConquistToCreate) {
  try {
    const data = await api.post<IConquistToCreate>({ payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}
