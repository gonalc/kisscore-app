import { DBBaseItem } from '.'
import { IUser } from './users'

export interface IBaseLeague {
  name: string
}

export interface ILeagueToCreate extends IBaseLeague {
  user: {
    id: IUser['id']
  }
}

export interface ILeague extends IBaseLeague, DBBaseItem {}

export interface ILeagueWithPlayers extends ILeague {
  players: IUser[]
}
