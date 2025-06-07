'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginSchema, TypeLoginSchema } from '~/entities/auth/schemas'
import { Button, Input, PasswordInput } from '~/shared/components/ui'
import { ROUTES } from '~/shared/constants'
import { useLoginMutation } from '../hooks'
import { AuthWrapper } from './AuthWrapper'

export const LoginForm = () => {
  const { mutate, isPending } = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeLoginSchema>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <AuthWrapper type='login' isDisabled={isPending}>
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
          autoComplete='password'
          classNames={{
            label: 'w-full'
          }}
          label={
            <div className='flex w-full justify-between'>
              <span>Password</span>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className='underline hover:text-blue-500 transition-colors duration-300 text-default-500'>
                Forgot Password?
              </Link>
            </div>
          }
          labelPlacement='outside'
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          placeholder='Password'
        />
        <Button type='submit' isLoading={isPending}>
          Login
        </Button>
      </form>
    </AuthWrapper>
  )
}
