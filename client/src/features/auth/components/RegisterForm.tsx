'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterSchema, TypeRegisterSchema } from '~/entities/auth/schemas'
import { Button, Input, PasswordInput } from '~/shared/components/ui'
import { useRegisterMutation } from '../hooks'
import { AuthWrapper } from './AuthWrapper'

export const RegisterForm = () => {
  const { mutate, isPending } = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeRegisterSchema>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(RegisterSchema)
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <AuthWrapper type='register' isDisabled={isPending}>
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
        <PasswordInput
          {...register('password')}
          type='password'
          autoComplete='new-password'
          label='Password'
          labelPlacement='outside'
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          placeholder='Password'
        />
        <PasswordInput
          {...register('confirmPassword')}
          type='password'
          autoComplete='new-password'
          label='Confirm Password'
          labelPlacement='outside'
          isInvalid={!!errors.confirmPassword?.message}
          errorMessage={errors.confirmPassword?.message}
          placeholder='Confirm Password'
        />
        <Button type='submit' isLoading={isPending}>
          Register
        </Button>
      </form>
    </AuthWrapper>
  )
}
