'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { SocketProvider } from '../socket/provider'
import { TanstackQueryProvider } from './TanstackQueryProvider'

dayjs.extend(isoWeek)

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
