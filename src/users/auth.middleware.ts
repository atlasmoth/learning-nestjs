import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UsersService } from './users.service';
const jwt = require('jsonwebtoken');
import { CreateUserDto } from './dtos/createUserDto';
import { ExtendRequest } from './interfaces/extendRequest';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly service: UsersService) {}
  async use(req: ExtendRequest, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key'];

    if (!token || typeof token !== 'string') {
      throw new ForbiddenException('Invalid credentials');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Pick<
      CreateUserDto,
      'email'
    >;
    if (!decoded.email) {
      throw new ForbiddenException('Invalid credentials');
    }
    const user = await this.service.fetchUserByEmail(decoded.email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    req.user = user;
    next();
  }
}
