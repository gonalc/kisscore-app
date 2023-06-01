import type { CountryItem } from 'react-native-country-codes-picker'
import type { DBBaseItem } from '.'
import type { ILeague } from './leagues'

export interface ICreationUser {
  name: string
  username: string
  birthdate: Date
  country: string
  city: string
  email: string
  password: string
}

export interface IUser extends Omit<ICreationUser, 'password'>, DBBaseItem {
  score: number
  countries: CountryItem['code'][]
  places: CountryItem['code'][]
}

export interface IUserWithLeagues extends IUser {
  leagues: ILeague[]
}
