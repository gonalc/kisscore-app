import { createContext } from 'react'
import type { IUser } from '@_types/users'

interface IUserContext {
  localUser: IUser
  setLocalUser: (user: IUser) => void
}

export const UserContext = createContext<IUserContext | null>(null)
