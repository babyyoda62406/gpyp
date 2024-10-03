import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ItPrivileges } from "src/auth/interfaces/ItPrivileges";

export class RemovePrivilegesDto {

    @ApiProperty({
        description: 'Id del usuario',
        example: 40
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @ApiProperty({
        description: 'Id del privilegio',
        example: ItPrivileges.ALL_PRIVILEGES, 
        enum: ItPrivileges
    })
    @IsNotEmpty()
    @IsEnum(ItPrivileges)
    privilege: ItPrivileges;
}