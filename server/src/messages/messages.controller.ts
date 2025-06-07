import { Controller, Post } from '@nestjs/common'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create() {
    return await this.messagesService.create()
  }
}
