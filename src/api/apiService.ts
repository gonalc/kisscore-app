import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

type APIResponse<T> = {
  data: T
}

type APIPayload = {
  path?: string
  payload: unknown
}

const LOCAL_URL = 'http://192.168.1.197:8080' // Change it to your local IP address
const SERVER_URL = 'http://54.74.43.13:3000'

class Api {
  baseUrl = `${__DEV__ ? LOCAL_URL : SERVER_URL}/api`

  constructor(entity: string) {
    this.baseUrl += `/${entity}`
  }

  async get<T>(path = '', config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result: AxiosResponse<APIResponse<T>> = await axios.get(url, config)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }

  async post<T>({ path = '', payload = {} }: APIPayload): Promise<T> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result: AxiosResponse<APIResponse<T>> = await axios.post(url, payload)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }

  async put<T>({ path = '', payload = {} }: APIPayload): Promise<T> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result: AxiosResponse<APIResponse<T>> = await axios.put(url, payload)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }

  async delete<T>(path: string): Promise<T> {
    try {
      const url = `${this.baseUrl}/${path}`
      const result: AxiosResponse<APIResponse<T>> = await axios.delete(url)

      return result.data.data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default Api
