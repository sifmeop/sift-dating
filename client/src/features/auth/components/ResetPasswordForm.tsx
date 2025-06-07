'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ResetPasswordSchema, TypeResetPasswordSchema } from '~/entities/auth/schemas'
import { Button, Input } from '~/shared/components/ui'
import { useResetPasswordMutation } from '../hooks'
import { AuthWrapper } from './AuthWrapper'

interface ResetPasswordFormProps {
  token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { mutate, isPending } = useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeResetPasswordSchema>({
    defaultValues: {
      password: '',
      token
    },
    resolver: zodResolver(ResetPasswordSchema)
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <AuthWrapper type='reset-password' isShowSocial={false} isDisabled={isPending}>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <Input
          {...register('password')}
          type='password'
          autoComplete='new-password'
          label='Password'
          labelPlacement='outside'
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          placeholder='Password'
        />
        <Button type='submit' isLoading={isPending}>
          Submit
        </Button>
      </form>
    </AuthWrapper>
  )
}
