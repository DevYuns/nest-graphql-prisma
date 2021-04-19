import { UserEntity } from './../entities/user.entity';
import { CommonOutput } from './../../common/dtos/common.dto';
import 'reflect-metadata';
import { InputType, Field, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class SignInInput extends PickType(UserEntity, ['email', 'password']) {}

@ObjectType()
export class SignInOutput extends CommonOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
