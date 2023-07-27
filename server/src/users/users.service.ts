import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user): Promise<User> {
    return await this.usersRepository.save(user);
  }

  // Finy by username
  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
