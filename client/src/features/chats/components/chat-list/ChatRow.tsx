'use client'

import { Avatar, cn } from '@heroui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageStatus } from '~/shared/components/ui'
import { formatLastMessageTime } from '../../utils'

export const ChatRow = ({ chat, user, message, unreadMessagesCount }: any) => {
  return (
    <Link
      href={`/app/chats/${chat.id}`}
      className='block px-4 py-2.5 hover:bg-default-100 transition-colors duration-200'>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <motion.div
            key='online-status'
            className={cn(
              'hidden size-3 rounded-full absolute bg-green-400 top-0 right-1 z-[1] transition-opacity duration-200',
              {
                block: user.isOnline
              }
            )}
          />
          <Avatar name={user.name} size='lg' src={undefined} />
        </div>
        <div className='flex-1 overflow-hidden'>
          <div className='flex items-center gap-1'>
            <h3 className='mr-auto truncate'>{user.name}</h3>
            <MessageStatus isRead={!!message.readAt} />
            <span className='text-sm text-default-500'>{formatLastMessageTime(message.createdAt)}</span>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-sm text-default-500 truncate'>{user.isTyping ? 'Typing...' : message.text}</p>
            {unreadMessagesCount > 0 && (
              <div className='min-w-5 h-5 px-1 rounded-full bg-blue-500 text-white text-xs grid place-items-center'>
                {unreadMessagesCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
