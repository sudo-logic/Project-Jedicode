import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignUpDto } from '../auth/dtos/signup.dto';

import { User } from './user.entity';
import { Room } from '../rooms/rooms.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: SignUpDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, user: SignUpDto): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ username });
  }

  // Check if username or email is already taken
  async isTaken(username: string, email: string): Promise<boolean> {
    // check if username is taken
    const user = await this.usersRepository.findOneBy({ username });
    if (user) {
      return true;
    }
    // check if email is taken
    const user2 = await this.usersRepository.findOneBy({ email });
    if (user2) {
      return true;
    }
    return false;
  }

  async getLeaderboard(): Promise<User[]> {
    const users = await this.usersRepository.find();
    users.sort((a, b) => b.score - a.score);
    // console.log(users[0].rooms);
    return users;
  }

  async authenticate(username: string, password: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({
        username,
      })
      .addSelect('user.password')
      .getOne();
    if (!user) {
      return null;
    }
    if (user.password !== password) {
      return null;
    }
    return user;
  }

  async findPastWars(id: UUID): Promise<Room[]> {
    // Get the user.rooms but sort by completed_at which is a Date object, use QueryBuilder
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'room')
      .where('user.id = :id', { id })
      .orderBy('room.created_at', 'DESC')
      .getOne();
    // console.log(rooms);
    return user.rooms;
  }
}
