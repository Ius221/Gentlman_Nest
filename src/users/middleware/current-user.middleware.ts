import { NextFunction, Request, Response } from 'express';
import { UsersService } from './../users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      try {
        const user = await this.userService.findById(userId);
        if (user) req.currentUser = user;
      } catch (err) {
        console.log('Middleware Error: ', err);
      }
    }

    next();
  }
}
