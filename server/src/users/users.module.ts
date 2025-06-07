import { Global, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersGateway } from './users.geteway'
import { UsersService } from './users.service'

@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersGateway, UsersService],
  exports: [UsersGateway, UsersService]
})
export class UsersModule {}
