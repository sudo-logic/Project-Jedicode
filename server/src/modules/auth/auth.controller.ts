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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { SignUpDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';

@ApiBearerAuth('access-token')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User signed in successfully' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User signed up successfully' })
  @Post('signup')
  @Public()
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User profile retrieved successfully' })
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.user;
  }
}
