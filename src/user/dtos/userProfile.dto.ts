import {CommonOutput} from './../../common/dtos/common.dto';
import {ArgsType, Field, ObjectType} from '@nestjs/graphql';
import {User} from '@prisma/client';

@ArgsType()
export class UserProfileInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CommonOutput {
  @Field({nullable: true})
  user?: User;
}
