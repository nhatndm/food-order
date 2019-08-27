import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from '../user/dto/user-auth-dto';
import { ApiUseTags } from '@nestjs/swagger';
import { SchemaValidationPipes } from '../pipes/schema-validation-pipes';

@Controller('auth')
@ApiUseTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new SchemaValidationPipes())
  async register(@Body() userAuthDto: UserAuthDto) {
    return await this.authService.register(userAuthDto);
  }

  @Post('/login')
  @UsePipes(new SchemaValidationPipes())
  async login(@Body() userAuthDto: UserAuthDto) {
    return await this.authService.login(userAuthDto);
  }
}
