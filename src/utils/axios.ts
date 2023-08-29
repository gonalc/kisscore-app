import axios from 'axios'
import { getJWTToken } from './storage'

async function createAxiosInstance(baseURL: string) {
  const token = await getJWTToken()

  const client = axios.create({
    baseURL,
    headers: {
      Authorization: token
    }
  })

  return client
}

export default createAxiosInstance
