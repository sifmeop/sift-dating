import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ROUTES } from '~/shared/constants'
import { useSetUser } from '~/shared/hooks'
import { authService } from '../services'

export const useLogout = () => {
  const router = useRouter()
  const setUser = useSetUser()

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null)
      router.push(ROUTES.LOGIN)
    }
  })

  const logout = () => mutate()

  return { logout }
}
