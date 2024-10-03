import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { tpDepth } from 'src/common/types/tpDepth';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { AddPrivilegesDto } from './dto/add-privileges.dto';
import { RemovePrivilegesDto } from './dto/remove-privilges.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('add-privileges')
  @Auth(ItPrivileges.ALL_PRIVILEGES)
  addPrivileges(@Body() addPrivilegesDto: AddPrivilegesDto) {
    return this.usersService.addPrivileges(addPrivilegesDto);
  }

  @Delete('remove-privileges')
  @Auth(ItPrivileges.ALL_PRIVILEGES)
  removePrivileges(@Body() removePrivilegesDto: RemovePrivilegesDto) {
    return this.usersService.removePrivileges(removePrivilegesDto);
  }

  @Post()
  @Auth(ItPrivileges.ALL_PRIVILEGES)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth()
  findAll(@Query() findAllUserDto: FindAllUserDto) {
    return this.usersService.findAll(findAllUserDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, user, updateUserDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Query('depth') depth: tpDepth) {
    if (depth && !['soft', 'hard'].includes(depth)) {
      throw new HttpException({ message: 'El parámetro depth debe ser soft o hard' }, HttpStatus.BAD_REQUEST);
    }
    return this.usersService.remove(id, user, depth);
  }

}
