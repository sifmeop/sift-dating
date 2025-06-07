'use client'

import { Divider } from '@heroui/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { authService } from '~/entities/auth/services'
import { Button } from '~/shared/components/ui'

export const AuthSocial = () => {
  return (
    <div className='mt-2 space-y-3'>
      <div className='grid grid-cols-[1fr_auto_1fr] gap-6 items-center'>
        <Divider />
        <span>Or continue with</span>
        <Divider />
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <Button onPress={() => authService.oauthByProvider('google')}>
          <FaGoogle size={20} />
        </Button>
        <Button onPress={() => authService.oauthByProvider('github')}>
          <FaGithub size={20} />
        </Button>
      </div>
    </div>
  )
}
