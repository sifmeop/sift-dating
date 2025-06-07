import { Controller, Get } from '@nestjs/common'
import { Authorized } from '~/decorators/authorized.decorator'
import { DiscoverService } from './discover.service'

@Controller('discover')
export class DiscoverController {
  constructor(private readonly discoverService: DiscoverService) {}

  @Get()
  async getDiscover(@Authorized('id') userId: string) {
    return this.discoverService.getDiscover(userId)
  }
}
