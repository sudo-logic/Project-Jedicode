import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UpdateRoomDto } from './dtos/update-room.dto';

@Controller('rooms')
@ApiTags('Rooms')
@ApiBearerAuth('access-token')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          default: 3,
        },
        duration: {
          type: 'number',
          default: 30,
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'The room has been successfully created.' })
  async createRoom(
    @Req() request,
    @Body('count') count: number = 3,
    @Body('duration') duration: number = 30,
  ) {
    const host = request.user.sub;
    return await this.roomsService.create(host, count, duration);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiOkResponse({ description: 'All rooms have been successfully retrieved.' })
  async getRooms() {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the room to retrieve' })
  @ApiOkResponse({ description: 'The room has been successfully retrieved.' })
  async getRoom(@Param('id') id: string) {
    return await this.roomsService.findOne(id);
  }

  @Post(':id/join')
  @ApiOperation({ summary: 'Join a room by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the room to join' })
  @ApiCreatedResponse({ description: 'The user has successfully joined the room.' })
  async joinRoom(@Param('id') id: string, @Req() request) {
    const userId = request.user.sub;
    return await this.roomsService.join(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a room by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the room to update' })
  @ApiBody({ type: UpdateRoomDto })
  @ApiOkResponse({ description: 'The room has been successfully updated.' })
  async updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomsService.update(id, updateRoomDto);
  }
}
