'use client'

import { cn } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbLogout } from 'react-icons/tb'
import { useLogout } from '~/entities/auth/hooks'
import { Button } from '~/shared/components/ui'
import { NAV_LINKS, ROUTES } from '~/shared/constants'

export const Sidebar = () => {
  const pathname = usePathname()
  const { logout } = useLogout()

  return (
    <aside className='border-r border-r-default-300 h-dvh'>
      <div className='p-4 grid grid-rows-[1fr_4fr] h-full gap-2'>
        <Link href={ROUTES.DATING}>
          <Image className='mx-auto' width={60} height={60} src='/images/logo.png' alt='Logo' />
        </Link>
        <nav>
          <ul className='flex flex-col gap-2'>
            {NAV_LINKS.map(({ label, href, Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col p-2 items-center rounded-lg border border-transparent transition-all duration-300',
                  {
                    'border-default-300': pathname === href
                  }
                )}>
                <Icon size={22} />
                <span>{label}</span>
              </Link>
            ))}
            <Button variant='light' className={cn('flex flex-col p-2 gap-1 items-center h-auto')} onPress={logout}>
              <TbLogout size={22} />
              <span>Logout</span>
            </Button>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
