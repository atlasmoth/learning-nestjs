import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  fetchUsers() {
    return this.repo.find();
  }
  fetchUserByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
}
