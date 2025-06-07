import { useQueryClient } from '@tanstack/react-query'
import { Socket } from 'socket.io-client'

export const useUserPresence = () => {
  const queryClient = useQueryClient()

  const handleUserPresence = (isOnline: boolean, userId: string) => {
    const previousChats = queryClient.getQueryData(['chats']) as any[]

    console.log('previousChats', previousChats)

    const updatedChats = previousChats.map((chat) => {
      if (chat.user.id === userId) {
        chat.user.isOnline = isOnline
      }

      return chat
    })

    console.log('updatedChats', updatedChats)

    queryClient.setQueryData(['chats'], () => updatedChats)
  }

  const setupUserPresenceHandlers = (socket: Socket) => {
    socket.on('userOnline', (data) => {
      console.log('userOnline', data)
      handleUserPresence(true, data.userId)
    })

    socket.on('userOffline', (data) => {
      console.log('userOffline', data)
      handleUserPresence(false, data.userId)
    })
  }

  const cleanupUserPresenceHandlers = (socket: Socket) => {
    socket.off('userOnline')
    socket.off('userOffline')
  }

  return { setupUserPresenceHandlers, cleanupUserPresenceHandlers }
}
