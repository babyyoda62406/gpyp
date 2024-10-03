import { PaginationDto } from "src/common/dto/pagination.dto";
import { ProductCategory, ProductStatus } from "../entities/product.entity";
import { IsEnum, IsOptional } from "class-validator";

export class FindAllProductDto extends PaginationDto {
    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;  
    
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus
}