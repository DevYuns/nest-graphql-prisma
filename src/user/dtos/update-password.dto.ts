import { UserEntity } from './../entities/user.entity';
import { CommonOutput } from './../../common/dtos/common.dto';
import { ObjectType, PickType, PartialType, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput extends PartialType(
  PickType(UserEntity, ['password']),
) {}

@ObjectType()
export class UpdatePasswordOutput extends CommonOutput {}
