import {
  ForbiddenException,
  Injectable,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendRequest } from './interfaces/extendRequest';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as ExtendRequest;
    if (!request.user.is_admin) {
      throw new ForbiddenException(
        'You are not allowed to perform this action, request admin privileges',
      );
    }
    return request.user.is_admin;
  }
}
