import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';

@Controller('users')
@ApiTags('Users')
@Public()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }
    

}
