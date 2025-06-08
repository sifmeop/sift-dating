import { Socket } from 'socket.io-client'
import { useUserPresence } from './useUserPresence'
import { useUserTyping } from './useUserTyping'

export const useSocketHandlers = () => {
  const { setupUserPresenceHandlers, cleanupUserPresenceHandlers } = useUserPresence()
  const { setupUserTypingHandlers, cleanupUserTypingHandlers } = useUserTyping()

  const setupSocketHandlers = (socket: Socket) => {
    setupUserPresenceHandlers(socket)
    setupUserTypingHandlers(socket)
  }

  const cleanupSocketHandlers = (socket: Socket) => {
    cleanupUserPresenceHandlers(socket)
    cleanupUserTypingHandlers(socket)
  }

  return { setupSocketHandlers, cleanupSocketHandlers }
}
