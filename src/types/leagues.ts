import { IUser } from './users'

export interface ILeague {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ILeagueWithPlayers extends ILeague {
  players: IUser[]
}
