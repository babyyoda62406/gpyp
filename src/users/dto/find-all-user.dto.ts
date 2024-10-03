import { PaginationDto } from "src/common/dto/pagination.dto";
import { UserStatus } from "../entities/user.entity";
import { IsEnum, IsOptional } from "class-validator";

export class FindAllUserDto  extends PaginationDto {    
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;   
}