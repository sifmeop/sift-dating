'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'

import { SocketProvider } from '../components/socket/provider'
import { TanstackQueryProvider } from './TanstackQueryProvider'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      <HeroUIProvider>
        <ToastProvider
          placement='top-center'
          toastProps={{
            timeout: 3000
          }}
        />
        <SocketProvider>{children}</SocketProvider>
      </HeroUIProvider>
    </TanstackQueryProvider>
  )
}
