import { useQueryClient } from '@tanstack/react-query'
import { Socket } from 'socket.io-client'

export const useUserPresence = () => {
  const queryClient = useQueryClient()

  const handleUserPresence = (isOnline: boolean, userId: string) => {
    queryClient.setQueryData(['chats'], (oldData: any[]) =>
      oldData.map((chat) => {
        if (chat.user.id === userId) {
          return {
            ...chat,
            user: {
              ...chat.user,
              isOnline
            }
          }
        }

        return chat
      })
    )
  }

  const setupUserPresenceHandlers = (socket: Socket) => {
    socket.on('userOnline', (data) => {
      handleUserPresence(true, data.userId)
    })

    socket.on('userOffline', (data) => {
      handleUserPresence(false, data.userId)
    })
  }

  const cleanupUserPresenceHandlers = (socket: Socket) => {
    socket.off('userOnline')
    socket.off('userOffline')
  }

  return { setupUserPresenceHandlers, cleanupUserPresenceHandlers }
}
