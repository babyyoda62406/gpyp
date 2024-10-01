import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { tpDepth } from 'src/common/types/tpDepth';
import * as bycrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly DTO: Repository<User> ,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = bycrypt.hashSync(createUserDto.password, bycrypt.genSaltSync(10));
    return await this.DTO.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.DTO.find();
    if(!users.length) throw new HttpException('', HttpStatus.NO_CONTENT);
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.DTO.findOne({
      where:{
        id: id
      }
    });
    if(!user) throw new HttpException(`No existe el usuario con id: ${id}`, HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult & User> {
    if(!Object.keys(updateUserDto).length) throw new HttpException('No hay datos para actualizar', HttpStatus.BAD_REQUEST);
    if(updateUserDto.password) updateUserDto.password = bycrypt.hashSync(updateUserDto.password, bycrypt.genSaltSync(10));
    const tempUpdate = await  this.DTO.update(id, updateUserDto);
    const tempUser = await this.findOne(id);
    return {...tempUser, ...tempUpdate};
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.DTO.findOne({
      where:{
        email: email
      }
    });
    return user;
  }

  async remove(id: number, depth: tpDepth = 'soft'): Promise<{message: string}> {
      const tempUser = await this.findOne(id);
      switch(depth) {
        case 'soft':
          tempUser.status = UserStatus.DELETED;
          await this.DTO.save(tempUser);
          break;
        case 'hard':
          await this.DTO.delete(id);
          break;
        default:
          tempUser.status = UserStatus.DELETED;
          await this.DTO.save(tempUser);
          break;
      }

      return {message: `User with id: ${id} has been ${depth} deleted `};
  }
}
