import { setUserSelector, userSelector, useUserStore } from '~/shared/stores'

export const useUser = () => useUserStore(userSelector)!
export const useSetUser = () => useUserStore(setUserSelector)
export const useIsAuthenticated = () => useUser() !== null
