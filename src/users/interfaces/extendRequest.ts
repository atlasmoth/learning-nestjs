import { Request } from '@nestjs/common';
import { User } from '../user.entity';

export interface ExtendRequest extends Request {
  user: User;
}
