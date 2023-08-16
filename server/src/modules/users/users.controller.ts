import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { userObjectDto } from '../shared/user.dto';
@Controller('users')
@ApiTags('Users')
@Public()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get('leaderboard')
  @Serialize(userObjectDto)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [userObjectDto],
  })
  async getLeaderboard() {
    return this.usersService.getLeaderboard();
  }
}
