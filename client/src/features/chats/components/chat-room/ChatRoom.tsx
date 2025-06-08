'use client'

import { ChatHeader } from './ChatHeader'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

interface ChatRoomProps {
  chatId: string
}

export const ChatRoom = ({ chatId }: ChatRoomProps) => {
  return (
    <div>
      <ChatHeader />
      <MessageList />
      <MessageInput chatId={chatId} />
    </div>
  )
}
