import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { FindAllProductDto } from './dto/find-all-product.dto';
import { ItFindAllResponse } from 'src/common/interfaces/ItFindAllResponse';
import { User } from 'src/users/entities/user.entity';
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly DAO: Repository<Product>,
    private readonly usersService: UsersService
  ) { }


  async create(owner: number, createProductDto: CreateProductDto): Promise<Product & { owner: number }> {
    const tempUser = await this.usersService.findOne(owner);
    const tempProduct = await this.DAO.save({
      ...createProductDto,
      user: tempUser
    });
    delete tempProduct.user;
    return { ...tempProduct, owner: tempUser.id };
  }

  async findAll(findAllProductDto: FindAllProductDto): Promise<ItFindAllResponse<Product>> {

    const { category, page, size } = findAllProductDto;

    const total = await this.DAO.count({
      where: {
        ...(category ? { category: category } : {})
      }
    });

    const products: Product[] = await this.DAO.find({
      where: {
        ...(category ? { category } : {})
      },
      order: {
        id: 'asc'
      },
      skip: (page - 1) * size,
      take: size
    });

    if (!products.length) throw new HttpException('', HttpStatus.NO_CONTENT);

    const metadata = {
      records: total,
      frame: page,
      frameSize: size,
      lastFrame: Math.ceil(total / size)
    };

    return { data: products, metadata };

  }

  async findOne(id: number): Promise<Product> {
    const product: Product = await this.DAO.findOne({
      where: {
        id: id
      }, 
      relations: ['user']
    });   

    if (!product) throw new HttpException({message: `No existe el producto con id: ${id}`}, HttpStatus.NOT_FOUND);
    
    return product;
  }

  
  async update(id: number, user: Partial<User> , updateProductDto: UpdateProductDto) {
    if(!Object.keys(updateProductDto).length) throw new HttpException({message: `Debe proporcionar al menos un campo para actualizar`}, HttpStatus.BAD_REQUEST);
    let tempProduct = await this.findOne(id);
    const allPrivileges =  user.privileges.includes(ItPrivileges.ALL_PRIVILEGES);
    
    if(!allPrivileges){
      if(tempProduct.user.id !== user.id) throw new HttpException({message: `No tiene permisos para editar este producto`}, HttpStatus.FORBIDDEN);
    }
    
    await this.DAO.update(id, {
      ...updateProductDto
    });

    tempProduct = await this.findOne(id);

    delete tempProduct.user;

    return { message: `Producto Editado` , product: tempProduct  };

  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
