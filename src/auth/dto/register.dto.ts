import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'User Name',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@email.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}