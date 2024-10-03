import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ProductStatus } from '../entities/product.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsEnum(ProductStatus)
    @IsOptional()
    status: ProductStatus
}
