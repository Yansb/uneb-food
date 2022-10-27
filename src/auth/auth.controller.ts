import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() user: loginDto) {
    return this.authService.login(user);
  }
}
