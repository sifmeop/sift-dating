import { Global, Module } from '@nestjs/common'
import { ChatsController } from './chats.controller'
import { ChatsService } from './chats.service'

@Global()
@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService]
})
export class ChatsModule {}
