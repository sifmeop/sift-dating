import { Card, CardBody, CardHeader, cn } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import { ROUTES } from '~/shared/constants'
import { AuthSocial } from './AuthSocial'

type IType = 'login' | 'register' | 'forgot-password' | 'reset-password'

interface AuthWrapperProps {
  type: IType
  description?: string
  isShowSocial?: boolean
  isDisabled?: boolean
  toBackUrl?: string
}

const titles: Record<IType, string> = {
  login: 'Welcome to SIFT Dating',
  register: 'Create Your Account',
  'forgot-password': 'Forgot Your Password?',
  'reset-password': 'Set a New Password'
}

export const AuthWrapper = ({
  children,
  type,
  description,
  isShowSocial = true,
  isDisabled = false,
  toBackUrl
}: React.PropsWithChildren<AuthWrapperProps>) => {
  const isLogin = type === 'login'
  const isForgotPassword = type === 'forgot-password'
  const isResetPassword = type === 'reset-password'

  const title = titles[type]

  return (
    <div
      className={cn('min-h-dvh flex flex-col md:justify-center', {
        'pointer-events-none': isDisabled
      })}>
      <div className='grid place-items-center gap-3 max-md:gap-0'>
        <Card className='max-w-lg w-full p-6 max-md:py-2 max-md:px-3 max-md:pb-0 rounded-lg max-md:rounded-none max-md:shadow-none'>
          <CardHeader className='flex-col items-center relative'>
            {toBackUrl && (
              <Link href={toBackUrl} className='absolute top-1 left-1'>
                <IoArrowBackOutline size={24} />
              </Link>
            )}
            <Image src='/images/logo.png' alt='logo' width={60} height={60} />
            <h1 className='font-extrabold text-lg text-center'>{title}</h1>
            {description && <p>{description}</p>}
          </CardHeader>
          <CardBody>
            {children}
            {isShowSocial && <AuthSocial />}
          </CardBody>
        </Card>
        {!isForgotPassword && !isResetPassword && (
          <p className='text-default-500'>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Link
              href={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}
              className='underline hover:text-blue-500 transition-colors duration-300'>
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
