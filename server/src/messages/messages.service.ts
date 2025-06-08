import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersGateway } from '~/users/users.geteway'

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socket: UsersGateway
  ) {}

  async create() {}
}
