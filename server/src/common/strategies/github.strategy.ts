import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GITHUB_CALLBACK_URL'),
      scope: ['user:email']
    })
  }

  async validate(
    _: string,
    __: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { emails } = profile
    const email = emails[0].value
    const user = {
      email
    }

    done(null, user)
  }
}
