import { useQuery } from '@tanstack/react-query'
import { chatsService } from '../service/chats.service'

export const useGetChatsQuery = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: chatsService.getChats
  })
}
