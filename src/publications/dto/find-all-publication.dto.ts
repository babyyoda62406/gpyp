import { PaginationDto } from "src/common/dto/pagination.dto";
import { PublicationStatus } from "../entities/publication.entity";
import { IsEnum, IsOptional } from "class-validator";

export class FindAllPublicationDto extends PaginationDto  {
    @IsEnum(PublicationStatus)
    @IsOptional()
    status: PublicationStatus;
}