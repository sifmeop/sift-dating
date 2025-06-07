'use client'

import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { API_HOST } from '~/shared/constants'
import { useIsAuthenticated } from '~/shared/hooks'
import { useSocketHandlers } from './handlers'
import { SocketContext } from './lib'

export const SocketProvider = ({ children }: React.PropsWithChildren) => {
  const socketRef = useRef<Socket | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const isAuthenticated = useIsAuthenticated()
  const { setupSocketHandlers, cleanupSocketHandlers } = useSocketHandlers()

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    if (!socketRef.current) {
      socketRef.current = io(API_HOST, {
        path: '/user',
        transports: ['websocket'],
        autoConnect: true,
        withCredentials: true
      })

      setSocket(socketRef.current)
      console.log('YES')
      setupSocketHandlers(socketRef.current)
    }

    return () => {
      if (socketRef.current) {
        cleanupSocketHandlers(socketRef.current)
        socketRef.current.disconnect()
        socketRef.current = null
        setSocket(null)
      }
    }
  }, [isAuthenticated])

  return <SocketContext value={socket}>{children}</SocketContext>
}
