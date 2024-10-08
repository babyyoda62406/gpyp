import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.JWTSECRET,
      signOptions: { expiresIn: envs.JWTEXPIREIN },
    }),
    forwardRef(() => UsersModule),
    ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports: [JwtStrategy , AuthService, PassportModule]
})
export class AuthModule { }
