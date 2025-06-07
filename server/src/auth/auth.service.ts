import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import argon2 from 'argon2'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { AuthMethod, Token, TokenType, User } from '~/prisma-generated'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersService } from '~/users/users.service'
import { LoginDto } from './dto/login.dto'
import { ResetPasswordDto } from './dto/password-recovery.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  public async register(req: Request, body: RegisterDto): Promise<User> {
    const isExists = await this.usersService.findByEmail(body.email)

    if (isExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const password = await argon2.hash(body.password)

    delete body.confirmPassword

    const newUser = await this.usersService.create({
      ...body,
      method: AuthMethod.CREDENTIALS,
      password
    })

    return this.saveSession(req, newUser)
  }

  public async login(req: Request, body: LoginDto): Promise<User> {
    const user = await this.usersService.findByEmail(body.email)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const isValidPassword = await argon2.verify(user.password, body.password)

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    return this.saveSession(req, user)
  }

  public async oauthByProvider(
    req: Request,
    res: Response,
    provider: AuthMethod
  ): Promise<void> {
    const email = req.user['email']

    if (!email) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    let user = await this.usersService.findByEmail(email)

    if (!user) {
      user = await this.usersService.create({
        email,
        method: provider
      })
    }

    this.saveSession(req, user)

    res.redirect(this.configService.get('CLIENT_URL') + '/app/chats')
  }

  public async forgotPassword(email: string): Promise<Token> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const token = uuidv4()
    const expiresIn = new Date()
    expiresIn.setHours(expiresIn.getHours() + 1)

    const isTokenExists = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.PASSWORD_RESET
      }
    })

    if (isTokenExists) {
      await this.prismaService.token.deleteMany({
        where: {
          email,
          type: TokenType.PASSWORD_RESET
        }
      })
    }

    const passwordResetToken = await this.prismaService.token.create({
      data: {
        email,
        type: TokenType.PASSWORD_RESET,
        token,
        expiresIn
      }
    })

    return passwordResetToken
  }

  public async resetPassword(
    body: ResetPasswordDto
  ): Promise<{ message: string }> {
    const isTokenExists = await this.prismaService.token.findFirst({
      where: {
        token: body.token,
        type: TokenType.PASSWORD_RESET
      }
    })

    if (!isTokenExists) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND)
    }

    const user = await this.usersService.findByEmail(isTokenExists.email)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const isEqual = await argon2.verify(user.password, body.password)

    if (isEqual) {
      throw new HttpException(
        'New password must be different from the old one',
        HttpStatus.BAD_REQUEST
      )
    }

    const passwordHash = await argon2.hash(body.password)

    await this.usersService.update(user.id, { password: passwordHash })

    await this.prismaService.token.deleteMany({
      where: {
        email: user.email,
        type: TokenType.PASSWORD_RESET
      }
    })

    return {
      message: 'Password reset successfully'
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new HttpException('Logout failed', HttpStatus.UNAUTHORIZED)
          )
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))

        resolve()
      })
    })
  }

  private async saveSession(req: Request, user: User): Promise<User> {
    delete user.password

    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save((err) => {
        if (err) {
          return reject(
            new HttpException('Failed to save session', HttpStatus.UNAUTHORIZED)
          )
        }

        resolve(user)
      })
    })
  }
}
