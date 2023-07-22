import AsyncStorage from '@react-native-async-storage/async-storage'
import type { IUser } from '@_types/users'

export const JWT_STORAGE_KEY = '@jwt'
export const USER_STORAGE_KEY = '@user'

export async function getJWTToken(): Promise<string | null> {
  try {
    const token = await AsyncStorage.getItem(JWT_STORAGE_KEY)

    return token
  } catch (error) {
    console.error('There was some error finding the token: ', error)
  }
}

export async function getStoredUser(): Promise<IUser> {
  try {
    const jsonUser = await AsyncStorage.getItem(USER_STORAGE_KEY)

    const user = JSON.parse(jsonUser)

    return user
  } catch (error) {
    console.error('There was some error finding the user: ', error)
  }
}

export async function storeSessionData(user: IUser, jwt: string) {
  await AsyncStorage.setItem(JWT_STORAGE_KEY, jwt)
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}
