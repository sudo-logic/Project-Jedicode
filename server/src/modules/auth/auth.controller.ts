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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { SignUpDto } from './dtos/signup.dto';
import { EmailIsTakenError } from './email-taken.error';
import { AuthService } from './auth.service';

@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  @Public()
  signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ access_token: string } | EmailIsTakenError> {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
