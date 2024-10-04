import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePublicationDto {

    @ApiProperty({
        description: 'Título de la publicación',
        example: 'Publicacion 1'
    })
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @ApiProperty({
        description: 'Tema de la publicación',
        example: 'Tecnología'
    })
    @IsNotEmpty()
    @IsString()
    topic: string;

    @ApiProperty({
        description: 'Descripción de la publicación',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Url de la publicación',
        example: 'https://drive.google.com/file/d/publication-default.png'
    })
    @IsOptional()
    @IsString()
    url: string;
}
