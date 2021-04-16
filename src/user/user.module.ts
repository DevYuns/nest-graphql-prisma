import { PrismaService } from './../prisma.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
