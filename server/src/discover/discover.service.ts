import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class DiscoverService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDiscover(userId: string) {}
}
