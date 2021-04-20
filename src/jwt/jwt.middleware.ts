import {UserService} from './../user/user.service';
import {JwtService} from './jwt.service';
import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('jwt' in req.headers) {
      const token = req.headers.jwt;

      try {
        const decoded = this.jwtService.verify(token.toString());

        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
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
