import { Controller, Get } from '@nestjs/common'
import { Authorized } from '~/decorators/authorized.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  public async findProfile(@Authorized('id') userId: string) {
    return await this.usersService.getProfile(userId)
  }
}
