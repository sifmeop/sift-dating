'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ForgotPasswordSchema, TypeForgotPasswordSchema } from '~/entities/auth/schemas'
import { Button, Input } from '~/shared/components/ui'
import { ROUTES } from '~/shared/constants'
import { useForgotPasswordMutation } from '../hooks'
import { AuthWrapper } from './AuthWrapper'

export const ForgotPasswordForm = () => {
  const { mutate, isPending } = useForgotPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeForgotPasswordSchema>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(ForgotPasswordSchema)
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <AuthWrapper type='forgot-password' toBackUrl={ROUTES.LOGIN} isShowSocial={false} isDisabled={isPending}>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <Input
          {...register('email')}
          type='email'
          autoComplete='email'
          label='Email'
          labelPlacement='outside'
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
          placeholder='Email'
        />
        <Button type='submit' isLoading={isPending}>
          Submit
        </Button>
      </form>
    </AuthWrapper>
  )
}
