import { Controller, Get } from '@nestjs/common'
import { Authorized } from '~/decorators/authorized.decorator'
import { ChatsService } from './chats.service'

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async getChats(@Authorized('id') userId: string) {
    return this.chatsService.getChats(userId)
  }
}
