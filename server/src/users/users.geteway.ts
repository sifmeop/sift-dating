import { forwardRef, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import * as cookie from 'cookie'
import * as signature from 'cookie-signature'
import Redis from 'ioredis'
import { Server, Socket } from 'socket.io'
import { ChatsService } from '~/chats/chats.service'

interface AuthenticatedSocket extends Socket {
  userId: string
}

@WebSocketGateway({
  path: '/user',
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  cookie: true
})
export class UsersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server
  private userSockets = new Map<string, string>()

  private readonly redis: Redis
  private readonly sessionPrefix: string
  private readonly sessionSecret: string
  private readonly sessionName: string

  constructor(
    configService: ConfigService,
    @Inject(forwardRef(() => ChatsService))
    private readonly chatsService: ChatsService
  ) {
    this.redis = new Redis(configService.getOrThrow('REDIS_URL'))

    this.sessionPrefix = configService.getOrThrow('SESSION_FOLDER')
    this.sessionSecret = configService.getOrThrow('SESSION_SECRET')
    this.sessionName = configService.getOrThrow('SESSION_NAME')
  }

  afterInit() {
    console.debug('WebSocket initialized')
  }

  public isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId)
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const userId = await this.validateSession(client)

      if (!userId) {
        return client.disconnect()
      }

      client.userId = userId
      this.userSockets.set(client.userId, client.id)

      await client.join(`user:${client.userId}`)

      const chatIds = await this.chatsService.getUserChatsForSocket(
        client.userId
      )

      for (const chatId of chatIds) {
        const room = `chat:${chatId}`
        this.server.to(room).emit('userOnline', { userId: client.userId })
        await client.join(room)
      }

      console.debug(`Клиент подключен: ${client.userId}`)
    } catch (error) {
      client.disconnect()
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    if (!client.userId) {
      return
    }

    const chatIds = await this.chatsService.getUserChatsForSocket(client.userId)

    for (const chatId of chatIds) {
      const room = `chat:${chatId}`
      await client.join(room)
      this.server.to(room).emit('userOffline', { userId: client.userId })
    }

    this.userSockets.delete(client.userId)

    console.debug(`Клиент отключен: ${client.userId}`)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    console.debug('message', message)
  }

  public sendMessage(userId: string, event: string, data: any) {
    // const user = this.connectedUsers.get(userId)
    // if (!user) {
    //   return
    // }
    // user.client.emit(event, data)
  }

  private async validateSession(client: Socket): Promise<string> {
    const cookies = client.handshake.headers.cookie
    if (!cookies) return

    const parsedCookies = cookie.parse(cookies)
    const rawSession = parsedCookies[this.sessionName]
    if (!rawSession || !rawSession.startsWith('s:')) return

    const sessionId = signature.unsign(rawSession.slice(2), this.sessionSecret)
    if (!sessionId) return

    const redisKey = `${this.sessionPrefix}${sessionId}`
    const sessionRaw = await this.redis.get(redisKey)
    if (!sessionRaw) return

    const session = JSON.parse(sessionRaw)
    const userId = session.userId

    if (!userId) return

    return userId
  }
}
