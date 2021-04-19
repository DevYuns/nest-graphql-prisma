import { PrismaModule } from './prisma/prisma.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'test').required(),
        SECRET_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    JwtModule.forRoot({
      secretKey: process.env.SECRET_KEY,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}
