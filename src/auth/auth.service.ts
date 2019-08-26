import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from '../user/dto/user-auth-dto';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { FilterUserDto } from '../user/dto/user-filter-dto';
import * as crypto from 'crypto';
import { AuthPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userAuthDto: UserAuthDto) {
    const filterUserDto: FilterUserDto = {
      email: userAuthDto.email,
      password: crypto.createHmac('sha256', userAuthDto.password).digest('hex'),
    };

    const user = await this.userService.findOne(filterUserDto);

    if (user) {
      throw new HttpException(
        {
          message:
            'This email is not available, please using the other email!!!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.createUser(
      filterUserDto as CreateUserDto,
    );

    const payload: AuthPayload = {
      email: newUser.email,
      id: newUser.id,
    };

    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(userAuthDto: UserAuthDto) {
    const filterUserDto: FilterUserDto = {
      email: userAuthDto.email,
      password: crypto.createHmac('sha256', userAuthDto.password).digest('hex'),
    };

    const user = await this.userService.findOne(filterUserDto);

    if (!user) {
      throw new HttpException(
        {
          message:
            'The email and password you entered did not match our records. Please double-check and try again.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: AuthPayload = {
      email: user.email,
      id: user.id,
    };

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
