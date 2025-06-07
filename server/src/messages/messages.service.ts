import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersGateway } from '~/users/users.geteway'

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socket: UsersGateway
  ) {}

  async create() {
    const message = await this.prismaService.message.create({
      data: {
        text: '',
        authorId: '',
        chatId: '',
        receiverId: '',
        replyToId: '',
        editedAt: '',
        deletedAt: ''
      }
    })

    this.socket.sendMessage(message.authorId, 'new-message', message)
  }
}
