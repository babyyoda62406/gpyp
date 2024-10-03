import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './decorators/auth.decorator';
import { ItPrivileges } from './interfaces/ItPrivileges';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,  
    ) {}

    @Post('login')
    @HttpCode(200)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }


    @Get('test')
    @Auth(ItPrivileges.EDITOR)
    test() {
        // console.log(a)
        return 'test';
    }


}
