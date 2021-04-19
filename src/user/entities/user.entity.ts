import { Gender } from './../dtos/signUp.dto';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
@ObjectType()
export class UserEntity {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => String, { nullable: true })
  description?: string;
}
