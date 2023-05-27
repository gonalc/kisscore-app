import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import type { IConquist, IConquistToCreate } from '../types/conquists'

const CONQUISTS_URL = `${BASE_URL}/conquists`

export async function createConquist(payload: IConquistToCreate) {
  try {
    const result: AxiosResponse<APIResponse<IConquist>> = await axios.post(CONQUISTS_URL, payload)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
