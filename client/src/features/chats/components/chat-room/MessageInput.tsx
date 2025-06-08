'use client'

import { Input } from '~/shared/components/ui'
import { useTyping } from '../../hooks'

interface MessageInputProps {
  chatId: string
}

export const MessageInput = ({ chatId }: MessageInputProps) => {
  const { value, onChange } = useTyping(chatId)

  return (
    <div>
      <Input value={value} onValueChange={onChange} />
    </div>
  )
}
