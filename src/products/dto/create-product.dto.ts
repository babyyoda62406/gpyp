import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductCategory } from "../entities/product.entity";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Producto 1'
    })

    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 20.99
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    price: number;

    @ApiProperty({
        description: 'Categoría del producto',
        example: ProductCategory.Electronics,
        enum: ProductCategory
    })
    @IsNotEmpty()
    @IsEnum(ProductCategory)
    category: ProductCategory;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Descripción del producto'
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Url del producto',
        example: 'https://drive.google.com/file/d/product-default.png'
    })
    @IsOptional()
    @IsString()
    url?: string;
}

