import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get leaderboard of users' })
  @ApiOkResponse({
    description: 'Returns the leaderboard of users',
    type: [userObjectDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getLeaderboard() {
    return this.usersService.getLeaderboard();
  }

  @Get()
  @Serialize(userObjectDto)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns all users',
    type: [userObjectDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Serialize(userObjectDto)
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiOkResponse({
    description: 'Returns a single user by ID',
    type: userObjectDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Get('past_wars/:id')
  @ApiOperation({ summary: 'Get past wars of a user by ID' })
  @ApiOkResponse({
    description: 'Returns past wars of a user by ID',
    type: [Room],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findPastWars(@Param('id') id: UUID) {
    return this.usersService.findPastWars(id);
  }
}
