import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma, User } from '~/prisma-generated'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({ data })
  }

  public async update(
    userId: string,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    return await this.prismaService.user.update({
      where: { id: userId },
      data
    })
  }

  public async getProfile(userId: string) {
    const user = await this.findById(userId)

    delete user.password

    return user
  }

  public async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email }
    })

    return user
  }
}
