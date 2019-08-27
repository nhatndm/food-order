import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { Configuration } from '../configuration/config.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: Configuration.SECRET_KEY,
      signOptions: { expiresIn: '7h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
