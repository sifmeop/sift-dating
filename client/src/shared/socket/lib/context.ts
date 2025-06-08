import { createContext, use } from 'react'
import { Socket } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

export const useSocket = () => {
  const context = use(SocketContext)

  if (!context) {
    throw new Error('Socket is not available! Did you forget to wrap with SocketProvider?')
  }

  return context
}
