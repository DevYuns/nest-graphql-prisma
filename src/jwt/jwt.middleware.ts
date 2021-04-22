import {UserService} from './../user/user.service';
import {JwtService} from './jwt.service';
import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction} from 'express';

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(
    req: Record<string, any>,
    res: Record<string, any>,
    next: NextFunction,
  ): Promise<void> {
    if ('jwt' in req.headers) {
      const token = req.headers.jwt;

      try {
        const decoded = this.jwtService.verify(token.toString());

        if (
          typeof decoded === 'object' &&
          hasOwnProperty(decoded, 'id') &&
          typeof decoded.id === 'number'
        ) {
          const {user} = await this.userService.findById(decoded.id);

          req.user = user;
        }
      } catch (error) {
        console.log(error);
      }
    }

    next();
  }
}
