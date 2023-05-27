import { DBBaseItem } from '.'

export interface ICreationConquist {
  country: string
  birthYear: number
  place: string
}

export interface IConquistToCreate extends ICreationConquist {
  userId: number
}

export interface IConquist extends IConquistToCreate, DBBaseItem {}
