import { ChatRoom } from '~/features/chats/components'

export default async function ChatById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <ChatRoom chatId={id} />
}
