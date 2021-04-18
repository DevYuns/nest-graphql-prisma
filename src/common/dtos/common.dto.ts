import 'reflect-metadata';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonOutput {
  @Field(() => Boolean)
  isSucceeded: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
