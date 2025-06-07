import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersGateway } from '~/users/users.geteway'

@Injectable()
export class ChatsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socket: UsersGateway
  ) {}

  async getChats(userId: string) {
    const { chats, unReadMessages } = await this.prismaService.$transaction(
      async (tx) => {
        const chats = await tx.chat.findMany({
          where: {
            participants: {
              some: { id: userId }
            }
          },
          include: {
            participants: {
              select: {
                id: true,
                name: true
              }
            },
            messages: {
              select: {
                text: true,
                readAt: true,
                createdAt: true
              },
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        })

        const unReadMessages = await tx.message.groupBy({
          by: ['chatId'],
          where: {
            readAt: null,
            receiverId: userId
          },
          _count: {
            id: true
          }
        })

        return { chats, unReadMessages }
      }
    )

    const transformedChats = chats.map((chat) => {
      const { messages, participants, ...restChat } = chat

      const user: Record<string, any> = participants.filter(
        (p) => p.id !== userId
      )[0]
      user.isOnline = this.socket.isUserOnline(user.id)
      const message = messages[0]
      const unreadMessagesCount = unReadMessages.filter(
        (m) => m.chatId === chat.id
      ).length

      return {
        chat: restChat,
        user,
        message,
        unreadMessagesCount
      }
    })

    return transformedChats
  }

  async getUserChatsForSocket(userId: string) {
    const chats = await this.prismaService.chat.findMany({
      where: {
        participants: {
          some: { id: userId }
        }
      },
      select: {
        id: true
      }
    })

    const chatIds = chats.map((chat) => chat.id)

    return chatIds
  }
}
