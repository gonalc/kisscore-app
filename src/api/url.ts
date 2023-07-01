// Change this to your local IP address
export const BASE_URL = __DEV__ ? 'http://192.168.1.150:8080/api' : 'http://54.74.43.13:3000/api'

export type APIResponse<T> = {
  data: T
}
