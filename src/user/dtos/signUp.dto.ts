import {UserEntity} from './../entities/user.entity';
import {CommonOutput} from './../../common/dtos/common.dto';
import 'reflect-metadata';
import {
  InputType,
  ObjectType,
  PickType,
  PartialType,
  IntersectionType,
} from '@nestjs/graphql';

@InputType()
class MainInfo extends PickType(UserEntity, [
  'email',
  'password',
  'birthday',
  'name',
  'gender',
]) {}

@InputType()
class AdditionalInfo extends PartialType(
  PickType(UserEntity, ['description']),
) {}

@InputType()
export class SignUpInput extends IntersectionType(MainInfo, AdditionalInfo) {}

@ObjectType()
export class SignUpOutput extends CommonOutput {}
