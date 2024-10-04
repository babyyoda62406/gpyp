import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { FindAllProductDto } from './dto/find-all-product.dto';
import { User } from 'src/users/entities/user.entity';
import { tpDepth } from 'src/common/types/tpDepth';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product, ProductCategory, ProductStatus } from './entities/product.entity';



@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiResponse({
    status: 200,
    description: 'Create Successful',
    type: Product,
    example: {
      "name": "Producto 1",
      "price": 20.99,
      "category": "Tools",
      "description": null,
      "url": null,
      "id": 9,
      "status": "ACTIVE",
      "owner": 48
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict with existing data',
    example: {
      "statusCode": 409,
      "timestamp": "2024-10-03T22:12:57.872Z",
      "message": "duplicate key value violates unique constraint \"UQ_# \"",
      "details": {
        "severity": "Severity of the error",
        "code": "Postrge SQL error code ",
        "detail": "Key (name of key)=(value of key) already exists.",
        "schema": "name of schema",
        "table": "name of table",
        "constraint": "UQ_ contrain ID ",
        "routine": "name of psql routine"
      }
    }
  })
  @Post()
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.COMERCIAL)
  create(@Body() createProductDto: CreateProductDto, @GetUser('id') owner: number) {
    return this.productsService.create(owner, createProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Find All Successful',
    example: {
      "data": [
        {
          "name": "Producto 1",
          "price": 20.99,
          "category": "Tools",
          "description": null,
          "url": null,
          "id": 9,
          "status": "ACTIVE",
          "owner": 48
        },
        {
          "name": "Producto 2",
          "price": 20.99,
          "category": "Tools",
          "description": null,
          "url": null,
          "id": 10,
          "status": "ACTIVE",
          "owner": 48
        }
      ],
      "metadata": {
        "records": 2,
        "frame": 1,
        "frameSize": 10,
        "lastFrame": 1
      }
    }
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Categoria del producto',
    enum: ProductCategory,
    example: ProductCategory.Electronics
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Estado del producto',
    enum: ProductStatus,
    example: ProductStatus.ACTIVE
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Pagina actual',
    example: 1
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Tamaño de la página',
    example: 10
  })
  @Get()
  @Auth()
  findAll(@Query() findAllProductDto: FindAllProductDto) {
    return this.productsService.findAll(findAllProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Find One Successful',
    type: Product,
    example: {
      "name": "Producto 1",
      "price": 20.99,
      "category": "Tools",
      "description": null,
      "url": null,
      "id": 9,
      "status": "ACTIVE",
      "owner": 48
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/products/#",
      "message": "No existe el producto con id: #"
    }
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del producto',
    example: 48
  })
  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update Successful',
    type: Product,
    example: {
      "message": "Producto Editado",
      "product": {
        "id": 10,
        "name": "Producto 1",
        "description": null,
        "price": "20.99",
        "category": "Tools",
        "url": null,
        "status": "ACTIVE"
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/products/#",
      "message": "No existe el producto con id: #"
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict with existing data',
    example: {
      "statusCode": 409,
      "timestamp": "2024-10-03T22:12:57.872Z",
      "message": "duplicate key value violates unique constraint \"UQ_# \"",
      "details": {
        "severity": "Severity of the error",
        "code": "Postrge SQL error code ",
        "detail": "Key (name of key)=(value of key) already exists.",
        "schema": "name of schema",
        "table": "name of table",
        "constraint": "UQ_ contrain ID ",
        "routine": "name of psql routine"
      }
    }
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del producto',
    example: 48
  })
  @Patch(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.COMERCIAL)
  update(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, user, updateProductDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove Successful',
    type: Product,
    example: {
      "message": "Product with  id: 10 has been  soft deleted"
    }
  })
  @ApiResponse({
    status: 204,
    description: 'No Content',
    example: ''
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/products/#",
      "message": "No existe el producto con id: #"
    }
  })

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del producto',
    example: 48
  })
  @ApiQuery({
    name: 'depth',
    required: false,
    description: 'Tipo de borrado (soft/hard)',
    example: "soft"
  })
  @Delete(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.COMERCIAL)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Query('depth') depth: tpDepth) {
    if (depth && !['soft', 'hard'].includes(depth)) {
      throw new HttpException({ message: 'El parámetro depth debe ser soft o hard' }, HttpStatus.BAD_REQUEST);
    }
    return this.productsService.remove(id, user, depth);
  }
}
