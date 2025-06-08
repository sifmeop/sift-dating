import { useCallback, useRef, useState } from 'react'
import { useSocket } from '~/shared/socket'

export const useTyping = (chatId: string) => {
  const [message, setMessage] = useState('')
  const socket = useSocket()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)

  const handleTypingStop = useCallback(() => {
    if (isTypingRef.current) {
      isTypingRef.current = false
      socket.emit('stopTyping', { chatId })
    }
  }, [socket])

  const handleChange = useCallback(
    (value: string) => {
      setMessage(value)

      if (!isTypingRef.current) {
        isTypingRef.current = true
        setTimeout(() => {
          socket.emit('startTyping', { chatId })
        }, 250)
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(handleTypingStop, 1000)
    },
    [handleTypingStop, socket]
  )

  return { value: message, onChange: handleChange }
}
