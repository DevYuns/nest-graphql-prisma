import { CommonOutput } from './../../common/dtos/common.dto';
import 'reflect-metadata';
import {
  InputType,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

const PASSWORD_LENGTH = 8;

export enum Gender {
  male = 'male',
  female = 'female',
}

registerEnumType(Gender, { name: 'Gender' });

@InputType('SignUpInputType', { isAbstract: true })
@ObjectType()
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(PASSWORD_LENGTH)
  password: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => Gender)
  @IsString()
  gender: Gender;
}

@ObjectType()
export class SignUpOutput extends CommonOutput {}
