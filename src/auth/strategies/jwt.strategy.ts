import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FilterUserDto } from 'src/user/dto/user-filter-dto';
import { AuthPayload } from '../auth.payload';
import { Configuration } from '../../configuration/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Configuration.SECRET_KEY,
    });
  }

  async validate(payload: AuthPayload, done: VerifiedCallback) {
    const userDto: FilterUserDto = {
      id: payload.id,
      email: payload.email,
    };

    const user = await this.userService.findOne(userDto);

    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    return done(null, user);
  }
}
