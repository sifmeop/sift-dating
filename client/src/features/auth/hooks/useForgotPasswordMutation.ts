import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TypeForgotPasswordSchema } from '~/entities/auth/schemas'
import { authService } from '~/entities/auth/services'
import { ROUTES } from '~/shared/constants'

export const useForgotPasswordMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (data: TypeForgotPasswordSchema) => await authService.forgotPassword(data),
    onSuccess: ({ token }) => {
      router.push(ROUTES.RESET_PASSWORD + `?token=${token}`)
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
