import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiResponse({
        status: 200,
        description: 'Login Successful',
        example: {
            token: "user token :)"
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        example: {
            "statusCode": 400,
            "timestamp": "2024-10-03T21:52:36.504Z",
            "path": "/api/v1/path-to-resource",
            "message": "Error de Validación",
            "errors": [
                {
                    "property": "Name of the Property 1",
                    "paths": [
                        "how backend will know the path to the property 1"
                    ],
                    "constraints": {
                        "contrain 1": "Description of the contrain 1",
                        "contrain n": "Description of the contrain n"
                    }
                },
                {
                    "property": "Name of the Property n",
                    "paths": [
                        "how backend will know the path to the property n"
                    ],
                    "constraints": {
                        "contrain 1": "Description of the contrain 1",
                        "contrain n": "Description of the contrain n"
                    }
                },

            ]
        }
    })
    @Post('login')
    @HttpCode(200)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @ApiResponse({
        status: 201,
        description: 'Register Successful',
        type: User,
        example: {
            token: "Token of new User"
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        example: {
            "statusCode": 400,
            "timestamp": "2024-10-03T21:52:36.504Z",
            "path": "/api/v1/path-to-resource",
            "message": "Error de Validación",
            "errors": [
                {
                    "property": "Name of the Property 1",
                    "paths": [
                        "how backend will know the path to the property 1"
                    ],
                    "constraints": {
                        "contrain 1": "Description of the contrain 1",
                        "contrain n": "Description of the contrain n"
                    }
                },
                {
                    "property": "Name of the Property n",
                    "paths": [
                        "how backend will know the path to the property n"
                    ],
                    "constraints": {
                        "contrain 1": "Description of the contrain 1",
                        "contrain n": "Description of the contrain n"
                    }
                },

            ]
        }
    })
    @ApiResponse({
        status: 409,
        description: 'Conflict with existing data',
        example: {
            "statusCode": 409,
            "timestamp": "2024-10-03T22:12:57.872Z",
            "message": "duplicate key value violates unique constraint \"UQ_# \"",
            "details": {
                "severity": "Severity of the error",
                "code": "Postrge SQL error code ",
                "detail": "Key (name of key)=(value of key) already exists.",
                "schema": "name of schema",
                "table": "name of table",
                "constraint": "UQ_ contrain ID ",
                "routine": "name of psql routine"
            }
        }
    })
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

}
