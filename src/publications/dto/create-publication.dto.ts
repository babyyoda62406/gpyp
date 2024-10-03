import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    topic: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    url: string;
}
