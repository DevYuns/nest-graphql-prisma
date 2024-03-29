import {
  UpdatePasswordOutput,
  UpdatePasswordInput,
} from './dtos/updatePassword.dto';
import {
  UpdateProfileOutput,
  UpdateProfileInput,
} from './dtos/updateProfile.dto';
import {UserEntity} from './entities/user.entity';
import {AuthUser} from './../auth/authUser.decorator';
import {AuthGuard} from './../auth/auth.guard';
import {SignInInput, SignInOutput} from './dtos/signIn.dto';
import {SignUpInput, SignUpOutput} from './dtos/signUp.dto';
import {UserService} from './user.service';
import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: UserEntity): UserEntity {
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

  @Mutation(() => UpdateProfileOutput)
  @UseGuards(AuthGuard)
  async updateProfile(
    @AuthUser() authUser: UserEntity,
    @Args('data') data: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    return this.userService.updateProfile(authUser.id, data);
  }

  @Mutation(() => UpdatePasswordOutput)
  @UseGuards(AuthGuard)
  async updatePassword(
    @AuthUser() authUser: UserEntity,
    @Args('data') data: UpdatePasswordInput,
  ): Promise<UpdatePasswordOutput> {
    return this.userService.updatePassword(authUser, data);
  }
}
