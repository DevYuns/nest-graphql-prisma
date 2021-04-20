import {UserEntity} from './../entities/user.entity';
import {CommonOutput} from './../../common/dtos/common.dto';
import {ObjectType, PickType, PartialType, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(
  PickType(UserEntity, ['name', 'description']),
) {}

@ObjectType()
export class UpdateProfileOutput extends CommonOutput {}
