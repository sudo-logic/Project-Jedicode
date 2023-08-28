import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { userObjectDto } from '../shared/user.dto';
import { UUID } from 'crypto';
import { Room } from '../rooms/rooms.entity';
@Controller('users')
@ApiTags('Users')
@Public()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('leaderboard')
  @Serialize(userObjectDto)
  async getLeaderboard() {
    return this.usersService.getLeaderboard();
  }

  @Get()
  @Serialize(userObjectDto)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [userObjectDto],
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Serialize(userObjectDto)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: userObjectDto,
  })
  async findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Get('past_wars/:id')
  async findPastWars(@Param('id') id: UUID) {
    return this.usersService.findPastWars(id);
  }
}
