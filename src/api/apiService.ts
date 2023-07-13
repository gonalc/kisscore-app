import axios, { type AxiosResponse } from 'axios'

type APIResponse<T> = {
  data: T
}

type APIPayload = {
  path?: string
  payload: unknown
}

const LOCAL_URL = 'http://192.168.1.150:8080'
const SERVER_URL = 'http://54.74.43.13:3000'

class Api {
  baseUrl = `${__DEV__ ? LOCAL_URL : SERVER_URL}/api`

  constructor(entity: string) {
    this.baseUrl += `/${entity}`
  }

  async get<T>(path = ''): Promise<AxiosResponse<APIResponse<T>>> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result = await axios.get(url)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }

  async post<T>({ path = '', payload = {} }: APIPayload): Promise<AxiosResponse<APIResponse<T>>> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result = await axios.post(url, payload)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }

  async put<T>({ path = '', payload = {} }: APIPayload): Promise<AxiosResponse<APIResponse<T>>> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result = await axios.put(url, payload)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }

  async delete<T>(path: string): Promise<AxiosResponse<APIResponse<T>>> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result = await axios.delete(url)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default Api
