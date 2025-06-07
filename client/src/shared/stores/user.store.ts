import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IUser } from '../types'

export interface IUserStore {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export const useUserStore = create<IUserStore>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user })
  }))
)
