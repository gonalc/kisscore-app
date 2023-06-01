import { createContext } from 'react'
import type { IUser } from '../types/users'

export const UserContext = createContext<IUser | null>(null)
