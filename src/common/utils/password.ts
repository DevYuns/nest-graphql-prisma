import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

const SALT_ROUND = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
};

export const validatePassword = async (
  incomingPassword: string,
  savedPassword: string,
): Promise<boolean> => {
  try {
    const isSucceeded = await bcrypt.compare(incomingPassword, savedPassword);

    return isSucceeded;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
};
