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
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ItPrivileges.ALL_PRIVILEGES  , ItPrivileges.COMERCIAL)
  create(@Body() createProductDto: CreateProductDto, @GetUser('id') owner: number) {
    return this.productsService.create(owner , createProductDto );
  }

  @Get()
  @Auth()
  findAll(@Query() findAllProductDto: FindAllProductDto) {
    return this.productsService.findAll(findAllProductDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES  , ItPrivileges.COMERCIAL)
  update(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, user , updateProductDto);
  }

  @Delete(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES  , ItPrivileges.COMERCIAL)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User , @Query('depth') depth: tpDepth) {
    if(depth && !['soft', 'hard'].includes(depth)) {
      throw new HttpException({message:'El parámetro depth debe ser soft o hard'}, HttpStatus.BAD_REQUEST);
    }
    return this.productsService.remove(id , user, depth);
  }
}
