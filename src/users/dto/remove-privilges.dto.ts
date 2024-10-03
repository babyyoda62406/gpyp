import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ItPrivileges } from "src/auth/interfaces/ItPrivileges";

export class RemovePrivilegesDto {
    
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsNotEmpty()
    @IsEnum(ItPrivileges)
    privilege: ItPrivileges;
}