'use client'

import { Loader } from '~/shared/components/ui'
import { useGetChatsQuery } from '../../hooks'
import { ChatRow } from './ChatRow'

export const ChatList = () => {
  const { data, isLoading, isError, isSuccess } = useGetChatsQuery()

  // data.sort((a, b) => {
  //   const aTime = new Date(a.lastMessageTime)
  //   const bTime = new Date(b.lastMessageTime)
  //   return bTime.getTime() - aTime.getTime()
  // })

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <div>Error</div>}
      {isSuccess && data && data.length > 0 && (
        <div>
          {data.map((props) => (
            <ChatRow key={props.chat.id} {...props} />
          ))}
        </div>
      )}
    </div>
  )
}
