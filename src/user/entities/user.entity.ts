import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsNumber,
  IsEmail,
  IsString,
  IsDate,
  IsEnum,
  Length,
} from 'class-validator';

const PASSWORD_LENGTH = 8;

export enum Gender {
  male = 'male',
  female = 'female',
}

registerEnumType(Gender, { name: 'Gender' });

@InputType({ isAbstract: true })
@ObjectType()
export class UserEntity {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @Length(PASSWORD_LENGTH)
  password: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Date)
  @IsDate()
  birthday: Date;

  @Field(() => Gender)
  @IsEnum(Gender)
  gender: Gender;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;
}
