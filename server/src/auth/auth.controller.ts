import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { Request, Response } from 'express'
import { IsPublic } from '~/decorators/is-public.decorator'
import { GithubOauthGuard } from '~/guards/github-oauth.guard'
import { GoogleOauthGuard } from '~/guards/google-oauth.guard'
import { AuthMethod } from '~/prisma-generated'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import {
  ForgotPasswordDto,
  ResetPasswordDto
} from './dto/password-recovery.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Req() req: Request, @Body() body: RegisterDto) {
    return await this.authService.register(req, body)
  }

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() body: LoginDto) {
    return await this.authService.login(req, body)
  }

  @IsPublic()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body.email)
  }

  @IsPublic()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.logout(req, res)
  }

  @IsPublic()
  @UseGuards(GoogleOauthGuard)
  @Get('oauth/google')
  public async oauthByGoogle() {}

  @IsPublic()
  @UseGuards(GoogleOauthGuard)
  @Get('oauth/google/callback')
  public async oauthByGoogleCallback(
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.authService.oauthByProvider(req, res, AuthMethod.GOOGLE)
  }

  @IsPublic()
  @UseGuards(GithubOauthGuard)
  @Get('oauth/github')
  public async oauthByGithub() {}

  @IsPublic()
  @UseGuards(GithubOauthGuard)
  @Get('oauth/github/callback')
  public async oauthByGithubCallback(
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.authService.oauthByProvider(req, res, AuthMethod.GITHUB)
  }
}
