import { createContext, useContext } from 'react'
import { Socket } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

export const useSocket = () => {
  const socket = useContext(SocketContext)

  if (!socket) {
    throw new Error('Socket is not available! Did you forget to wrap with SocketProvider?')
  }

  return socket
}
