import { DBBaseItem } from '.'
import { IUser } from './users'

export interface IBaseLeague {
  name: string
}
export interface ILeague extends IBaseLeague, DBBaseItem {}

export interface ILeagueWithPlayers extends ILeague {
  players: IUser[]
}
