import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import IoRedis from 'ioredis'
import ms, { StringValue } from 'ms'
import { parseBoolean } from '~/utils/parseBoolean'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)
  const redis = new IoRedis(config.getOrThrow<string>('REDIS_URL'))

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax'
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_FOLDER')
      })
    })
  )

  app.enableCors({
    origin: config.getOrThrow<string>('CLIENT_URL'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  })

  app.setGlobalPrefix('api')

  await app.listen(config.getOrThrow<number>('PORT'), () => {
    Logger.debug(`Server started on port ${config.getOrThrow<number>('PORT')}`)
  })
}
bootstrap()
