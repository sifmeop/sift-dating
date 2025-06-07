import { Socket } from 'socket.io-client'
import { useUserPresence } from './useUserPresence'

export const useSocketHandlers = () => {
  const { setupUserPresenceHandlers, cleanupUserPresenceHandlers } = useUserPresence()

  const setupSocketHandlers = (socket: Socket) => {
    setupUserPresenceHandlers(socket)
  }

  const cleanupSocketHandlers = (socket: Socket) => {
    cleanupUserPresenceHandlers(socket)
  }

  return { setupSocketHandlers, cleanupSocketHandlers }
}
