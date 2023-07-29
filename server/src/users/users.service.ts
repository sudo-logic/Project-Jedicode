import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dtos/signup.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: SignUpDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
