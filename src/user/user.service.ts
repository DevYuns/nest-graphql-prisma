import { UserEntity } from './entities/user.entity';
import {
  UpdateProfileInput,
  UpdateProfileOutput,
} from './dtos/update-profile.dto';
import { JwtService } from './../jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { SignInInput, SignInOutput } from './dtos/signIn.dto';
import { SignUpInput, SignUpOutput } from './dtos/signUp.dto';
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { hashPassword, validatePassword } from '../common/utils/password';
import { customAssert } from '../common/utils/customAssert';
@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async findById(userId: number): Promise<UserProfileOutput> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      return {
        isSucceeded: true,
        user,
      };
    } catch (error) {
      return customAssert(false, 'User Not Found');
    }
  }

  async signUp(data: SignUpInput): Promise<SignUpOutput> {
    try {
      const exists = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (exists) {
        return customAssert(false, 'There is a user with that email already');
      }

      const { password } = data;
      const hashedPassword = await hashPassword(password);

      await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
      return { isSucceeded: true };
    } catch (error) {
      return customAssert(false, error);
    }
  }

  async signIn({ email, password }: SignInInput): Promise<SignInOutput> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) return customAssert(false, 'User not found');

      const checkedPassword = await validatePassword(password, user.password);
      if (!checkedPassword) return customAssert(false, 'Wrong password');

      const token = this.jwtService.sign(user.id);
      return {
        isSucceeded: true,
        token,
      };
    } catch (error) {
      return customAssert(false, error);
    }
  }

  async updateProfile(
    userId: number,
    data: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: data,
      });

      return { isSucceeded: true };
    } catch (error) {
      return customAssert(false, error);
    }
  }

  async updatePassword(
    authUser: UserEntity,
    { password }: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    try {
      const newPassword = await hashPassword(password);

      await this.prisma.user.update({
        where: { id: authUser.id },
        data: { password: newPassword },
      });

      return { isSucceeded: true };
    } catch (error) {
      return customAssert(false, error);
    }
  }
}
