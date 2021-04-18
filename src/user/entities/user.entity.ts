import { Gender } from './../dtos/signUp.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  gender?: Gender;
}
