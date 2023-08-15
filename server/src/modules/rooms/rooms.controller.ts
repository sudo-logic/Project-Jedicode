import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UpdateRoomDto } from './dtos/update-room.dto';

@Controller('rooms')
@ApiTags('Rooms')
@ApiBearerAuth('access-token')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(@Req() request) {
    const host = request.user.sub;
    return await this.roomsService.create(host);
  }

  @Get()
  async getRooms() {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    return await this.roomsService.findOne(id);
  }

  @Post(':id/join')
  async joinRoom(@Param('id') id: string, @Req() request) {
    const userId = request.user.sub;
    return await this.roomsService.join(id, userId);
  }

  @Put(':id')
  async updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomsService.update(id, updateRoomDto);
  }
}
