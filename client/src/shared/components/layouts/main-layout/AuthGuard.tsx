'use client'

import { addToast, Spinner } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ROUTES } from '~/shared/constants'
import { useSetUser } from '~/shared/hooks'
import { userService } from '~/shared/services'

export const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const router = useRouter()
  const setUser = useSetUser()

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser
  })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  useEffect(() => {
    if (!error) return

    addToast({
      title: ((error as AxiosError).response?.data as { message: string }).message,
      color: 'danger'
    })
    router.push(ROUTES.LOGIN)
  }, [error])

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}
