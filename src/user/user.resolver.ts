import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  hi() {
    return 'hi';
  }

  @Mutation(() => CreateUserOutput)
  async signupUser(
    @Args('data') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(createUserInput);
  }
}
