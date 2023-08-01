import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dtos/signin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { SignUpDto } from './dtos/signup.dto';
import { EmailIsTakenError } from './email-taken.error';
import { AuthService } from './auth.service';

@ApiBearerAuth('access-token')
@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ access_token: string } | EmailIsTakenError> {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.user;
  }
}
