import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '~/guards/auth.guard'
import { GithubStrategy } from '~/strategies/github.strategy'
import { GoogleStrategy } from '~/strategies/google.strategy'
import { AuthModule } from './auth/auth.module'
import { ChatsModule } from './chats/chats.module'
import { DiscoverModule } from './discover/discover.module'
import { MessagesModule } from './messages/messages.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    DiscoverModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    GoogleStrategy,
    GithubStrategy
  ]
})
export class AppModule {}
