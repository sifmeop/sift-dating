'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface ReadReceiptProps {
  isRead: boolean
}

export const MessageStatus = ({ isRead }: ReadReceiptProps) => {
  const prevIsRead = useRef(isRead)

  useEffect(() => {
    if (prevIsRead.current !== isRead) {
      prevIsRead.current = isRead
    }
  }, [isRead])

  return (
    <svg
      className={isRead ? 'text-blue-500' : 'text-gray-500'}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      stroke='currentColor'
      strokeWidth='0'
      viewBox='0 0 512 512'>
      {isRead ? (
        <motion.path
          key='read'
          initial={{ pathLength: isRead === prevIsRead.current ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='32'
          d='M464 128 240 384l-96-96m0 96-96-96m320-160L232 284'
        />
      ) : (
        <motion.path
          key='unread'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='32'
          d='M416 128 192 384l-96-96'
        />
      )}
    </svg>
  )
}
