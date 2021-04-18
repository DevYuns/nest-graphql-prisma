import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { AuthUser } from './../auth/auth-user.decorator';
import { AuthGuard } from './../auth/auth.guard';
import { SignInOutput } from './dtos/signIn.dto';
import { SignInInput } from './dtos/signIn.dto';
import { SignUpInput, SignUpOutput } from './dtos/signUp.dto';
import { UserService } from './user.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Mutation(() => SignUpOutput)
  async signUp(@Args('data') data: SignUpInput): Promise<SignUpOutput> {
    return this.userService.signUp(data);
  }

  @Mutation(() => SignInOutput)
  async signIn(@Args('data') data: SignInInput): Promise<SignInOutput> {
    return this.userService.signIn(data);
  }
}
