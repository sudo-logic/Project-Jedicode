import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { Room } from './rooms.entity';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { QuestionsService } from '../questions/questions.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    private usersService: UsersService,
    private questionsService: QuestionsService,
  ) {}

  async findAll(): Promise<Room[]> {
    return await this.roomsRepository.find();
  }

  async findOne(id: string): Promise<Room> {
    return await this.roomsRepository.findOne({ where: { id } });
  }

  async create(host: string, count, duration): Promise<Room> {
    const room = new Room();

    // room.room_url = await axios
    //   .get('https://random-word-api.herokuapp.com/word?number=3')
    //   .then((res) => {
    //     return res.data.join('-');
    //   });

    room.created_by = await this.usersService.findOne(host);

    room.player_data = [
      {
        user_id: host,
        is_host: true,
        score: 0,
      },
    ];

    room.room_config = {
      count,
      duration,
    };

    room.questions = await this.questionsService.findRandom(count);

    return await this.roomsRepository.save(room);
  }

  async update(id: string, room: UpdateRoomDto): Promise<void> {
    await this.roomsRepository.update(id, room);
  }

  async join(id: string, user_id: string): Promise<Room> {
    // check if user is already in the room
    this.findOne(id).then((room) => {
      const userAlreadyInRoom = room.player_data.find((player) => {
        return player.user_id === user_id;
      });

      if (userAlreadyInRoom) {
        return room;
      }
    });

    const room = await this.findOne(id);

    room.player_data.push({
      user_id,
      is_host: false,
      score: 0,
    });

    return await this.roomsRepository.save(room);
  }

  async delete(id: string): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}
