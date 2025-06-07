import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '~/decorators/is-public.decorator'
import { UsersService } from '~/users/users.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    )

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const userId = request.session.userId

    if (!userId) {
      return false
    }

    const user = await this.usersService.findById(userId)

    request.user = user

    return true
  }
}
