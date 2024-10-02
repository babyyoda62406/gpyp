import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.JWTSECRET,
      signOptions: { expiresIn: envs.JWTEXPIREIN },
    }),UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
