import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User, UserStatus } from 'src/users/entities/user.entity';
import * as bycrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }


    async login(loginDto: LoginDto) {
        const user: User = await this.usersService.findByEmail(loginDto.email);

        if (!user || user.status == UserStatus.DELETED) throw new HttpException('Verifique sus credenciales', HttpStatus.UNAUTHORIZED);

        if (!bycrypt.compareSync(loginDto.password, user.password)) throw new HttpException('Verifique sus credenciales', HttpStatus.UNAUTHORIZED);

        if (user.status === UserStatus.INACTIVE) throw new HttpException('Cuenta Inactiva', HttpStatus.FORBIDDEN);
        
        return {
            token: this.jwtService.sign({ email: user.email  })
        };
    }

    async register(regsterDto: RegisterDto){
        const tempUser  = await this.usersService.create({...regsterDto, details: null , status: UserStatus.ACTIVE});
        return {
            token: this.jwtService.sign({ email: tempUser.email  })
        };
    }
}
