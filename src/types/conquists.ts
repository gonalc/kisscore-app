import { DBBaseItem } from '.'

export interface ICreationConquist {
  country: string
  birthYear: number
  place: string
}

export interface IConquist extends ICreationConquist, DBBaseItem {}
