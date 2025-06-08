import { useQueryClient } from '@tanstack/react-query'
import { Socket } from 'socket.io-client'

export const useUserTyping = () => {
  const queryClient = useQueryClient()

  const handleUserTyping = (isTyping: boolean, userId: string) => {
    queryClient.setQueryData(['chats'], (oldData: any[]) =>
      oldData.map((chat) => {
        if (chat.user.id === userId) {
          return {
            ...chat,
            user: {
              ...chat.user,
              isTyping
            }
          }
        }

        return chat
      })
    )
  }

  const setupUserTypingHandlers = (socket: Socket) => {
    socket.on('startTyping', (data) => {
      handleUserTyping(true, data.userId)
    })

    socket.on('stopTyping', (data) => {
      handleUserTyping(false, data.userId)
    })
  }

  const cleanupUserTypingHandlers = (socket: Socket) => {
    socket.off('startTyping')
    socket.off('stopTyping')
  }

  return { setupUserTypingHandlers, cleanupUserTypingHandlers }
}
