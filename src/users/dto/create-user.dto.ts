import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserStatus } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Usuario 1'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@email.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '123456'
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    

    @ApiProperty({
        description: 'Url de la imagen del usuario',
        example: 'https://drive.google.com/file/d/profile-default.png'
    })
    @IsOptional()
    @IsString()
    url?: string;

    @ApiProperty({
        description: 'Detalles del usuario',
        example: 'Detalles del usuario'
    })
    @IsString()
    @IsOptional()
    details: string

    @ApiProperty({
        description: 'Estado del usuario',
        example: 'ACTIVE',
        enum: UserStatus
    })
    @IsEnum(UserStatus)
    @IsOptional()
    status: UserStatus;
}
