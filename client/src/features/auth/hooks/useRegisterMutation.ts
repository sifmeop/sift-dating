'use client'

import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TypeRegisterSchema } from '~/entities/auth/schemas'
import { authService } from '~/entities/auth/services'
import { ROUTES } from '~/shared/constants'
import { useSetUser } from '~/shared/hooks'

export const useRegisterMutation = () => {
  const router = useRouter()
  const setUser = useSetUser()

  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: TypeRegisterSchema) => await authService.register(data),
    onSuccess: (data) => {
      setUser(data)
      router.push(ROUTES.CHATS)
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
