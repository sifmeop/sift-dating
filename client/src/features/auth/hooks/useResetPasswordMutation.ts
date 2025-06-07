import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TypeResetPasswordSchema } from '~/entities/auth/schemas'
import { authService } from '~/entities/auth/services'
import { ROUTES } from '~/shared/constants'

export const useResetPasswordMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (data: TypeResetPasswordSchema) => await authService.resetPassword(data),
    onSuccess: () => {
      router.push(ROUTES.LOGIN)

      addToast({
        title: 'Password updated successfully',
        color: 'success'
      })
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string }).message

      addToast({
        title: message,
        color: 'danger'
      })
    }
  })
}
