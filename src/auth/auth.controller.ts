import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from '../user/dto/user-auth-dto';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() userAuthDto: UserAuthDto) {
    return await this.authService.register(userAuthDto);
  }

  @Post('/login')
  async login(@Body() userAuthDto: UserAuthDto) {
    return await this.authService.login(userAuthDto);
  }
}
