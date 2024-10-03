import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { ItJwtPayload } from '../interfaces/ItJwtPayload';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserStatus } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: envs.JWTSECRET,
    });
  }

  async validate(payload: ItJwtPayload) {
    
    const user = await this.userService.findByEmail(payload.email);
    if (!user || user.status === UserStatus.DELETED) throw new HttpException({
        message: 'No tiene acceso al recurso solicitado', 
        details: 'User not Found'
    } , HttpStatus.UNAUTHORIZED )

    if(user.status === UserStatus.INACTIVE ) throw new HttpException({
        message: 'Cuenta Inactiva', 
        details: 'User Inactive'
    } , HttpStatus.FORBIDDEN )
    
    return user
  }
}