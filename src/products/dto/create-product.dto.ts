import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductCategory } from "../entities/product.entity";
import { Type } from "class-transformer";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsNotEmpty()
    @IsEnum(ProductCategory)
    category: ProductCategory;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    url?: string;
}

