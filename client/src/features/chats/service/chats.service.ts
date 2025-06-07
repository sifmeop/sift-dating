import { API } from '~/shared/lib/api'

class ChatsService {
  async getChats() {
    const response = await API.get('/chats')
    return response.data
  }
}

export const chatsService = new ChatsService()
