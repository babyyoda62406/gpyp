import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { tpDepth } from 'src/common/types/tpDepth';
import * as bycrypt from 'bcrypt'
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { ItFindAllResponse } from 'src/common/interfaces/ItFindAllResponse';
import { AddPrivilegesDto } from './dto/add-privileges.dto';
import { RemovePrivilegesDto } from './dto/remove-privilges.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly DAO: Repository<User> ,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = bycrypt.hashSync(createUserDto.password, bycrypt.genSaltSync(10));
    const howBefore = await this.DAO.count()
    if(!howBefore) return  await this.DAO.save({...createUserDto, privileges: [ItPrivileges.ALL_PRIVILEGES]});
    return await this.DAO.save(createUserDto);
  }

  async findAll(findAllUserDto: FindAllUserDto): Promise<ItFindAllResponse<User>> {
    const { status, page, size } = findAllUserDto;
    const total = await this.DAO.count({
      where: {
        ...(status ? { status: status } : {})
      }
    });

    const users: User[] = await this.DAO.find({
      where: {
        ...(status ? { status: status } : {})
      },
      order: {
        id: 'asc'
      },
      skip: (page - 1) * size,
      take: size
    });

    if (!users.length) throw new HttpException('', HttpStatus.NO_CONTENT);

    const metadata = {
      records: total,
      frame: page,
      frameSize: size,
      lastFrame: Math.ceil(total / size)
    };

    return { data: users, metadata };
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.DAO.findOne({
      where:{
        id: id
      }
    });
    if(!user) throw new HttpException({message:`No existe el usuario con id: ${id}`}, HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: number,  user: User, updateUserDto: UpdateUserDto): Promise<UpdateResult & User> {
    if(!Object.keys(updateUserDto).length) throw new HttpException({message:'No hay datos para actualizar'}, HttpStatus.BAD_REQUEST);
    
    const allPrivileges = user.privileges.includes(ItPrivileges.ALL_PRIVILEGES);
    if (!allPrivileges) {
      if (user.id !== id) throw new HttpException({ message: `No tiene permisos para editar este usuario` }, HttpStatus.FORBIDDEN);
    }

    if(updateUserDto.password) updateUserDto.password = bycrypt.hashSync(updateUserDto.password, bycrypt.genSaltSync(10));
    const tempUpdate = await  this.DAO.update(id, updateUserDto);
    const tempUser = await this.findOne(id);
    return {...tempUser, ...tempUpdate};
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.DAO.findOne({
      where:{
        email: email
      }, 
      select: ['id', 'name', 'email', 'password', 'privileges', 'status']
    });
    return user;
  }

  async remove(id: number, user: User , depth: tpDepth = 'soft'): Promise<{message: string}> {
      const tempUser = await this.findOne(id);
      const allPrivileges = user.privileges.includes(ItPrivileges.ALL_PRIVILEGES);
      if (!allPrivileges) {
        if (user.id !== id) throw new HttpException({ message: `No tiene permisos para eliminar este usuario` }, HttpStatus.FORBIDDEN);
      }
      switch(depth) {
        case 'soft':
          tempUser.status = UserStatus.DELETED;
          await this.DAO.save(tempUser);
          break;
        case 'hard':
          await this.DAO.delete(id);
          break;
        default:
          tempUser.status = UserStatus.DELETED;
          await this.DAO.save(tempUser);
          break;
      }

      return {message: `User with id: ${id} has been ${depth} deleted `};
  }

  async addPrivileges(addPrivilegesDto: AddPrivilegesDto): Promise<User> {
    const user = await this.findOne(addPrivilegesDto.userId);

    if (!user.privileges.includes(addPrivilegesDto.privilege)) {
      user.privileges.push(addPrivilegesDto.privilege);
      await this.DAO.save(user);
    }

    return user;
  }

  async removePrivileges(removePrivilegesDto: RemovePrivilegesDto): Promise<User> {    
    const user = await this.findOne(removePrivilegesDto.userId);    
    user.privileges = user.privileges.filter(privilege => privilege !== removePrivilegesDto.privilege);
    await this.DAO.save(user);
    return user;
  }

}
