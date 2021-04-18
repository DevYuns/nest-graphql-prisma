import { CommonOutput } from './../../common/dtos/common.dto';
import 'reflect-metadata';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType('SignInInputType', { isAbstract: true })
@ObjectType()
export class SignInInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(8)
  password: string;
}

@ObjectType()
export class SignInOutput extends CommonOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
