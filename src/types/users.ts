import { ILeague } from './leagues'

export interface ICreationUser {
  name: string
  birthdate: Date
  country: string
  city: string
  email: string
  password: string
}

export interface IUser extends Omit<ICreationUser, 'password'> {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface IUserWithLeagues extends IUser {
  leagues: ILeague[]
}
