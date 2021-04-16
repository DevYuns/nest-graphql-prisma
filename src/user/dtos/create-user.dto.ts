import 'reflect-metadata';
import { InputType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User, Prisma } from '@prisma/client';

@InputType('CreateUserInputType', { isAbstract: true })
@ObjectType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class CreateUserOutput {
  @Field(() => Boolean)
  isSucceeded: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
