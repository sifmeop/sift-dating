'use client'

import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TypeLoginSchema } from '~/entities/auth/schemas'
import { authService } from '~/entities/auth/services'
import { ROUTES } from '~/shared/constants'
import { useSetUser } from '~/shared/hooks'

export const useLoginMutation = () => {
  const router = useRouter()
  const setUser = useSetUser()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: TypeLoginSchema) => await authService.login(data),
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
