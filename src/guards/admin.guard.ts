import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/users/user.entity';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.currentUser)
      throw new UnauthorizedException('Please Login Again');

    if (request.currentUser.role === Role.ADMIN) return true;
    return false;
  }
}
