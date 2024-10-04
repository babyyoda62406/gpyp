import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { tpDepth } from 'src/common/types/tpDepth';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { User, UserStatus } from './entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { AddPrivilegesDto } from './dto/add-privileges.dto';
import { RemovePrivilegesDto } from './dto/remove-privilges.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @ApiResponse({
    status: 200,
    description: 'Add Privileges Successful',
    type: User,
    example: {
      "id": 40,
      "name": "Usuario 2",
      "email": "dtm@gmail.com",
      "details": null,
      "status": "ACTIVE",
      "privileges": [
        "ALL_PRIVILEGES",
        "COMERCIAL"
      ]
    }

  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/users/add-privileges",
      "message": "No existe el usuario con id: #"
    }
  })
  @Post('add-privileges')
  @Auth(ItPrivileges.ALL_PRIVILEGES)
  @HttpCode(200)
  addPrivileges(@Body() addPrivilegesDto: AddPrivilegesDto) {
    return this.usersService.addPrivileges(addPrivilegesDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove Privileges Successful',
    type: User,
    example: {
      "id": 40,
      "name": "Usuario 2",
      "email": "dtm@gmail.com",
      "details": null,
      "status": "ACTIVE",
      "privileges": [
        "ALL_PRIVILEGES",
      ]
    }

  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/users/add-privileges",
      "message": "No existe el usuario con id: #"
    }
  })
  @Delete('remove-privileges')
  @Auth(ItPrivileges.ALL_PRIVILEGES)
  removePrivileges(@Body() removePrivilegesDto: RemovePrivilegesDto) {
    return this.usersService.removePrivileges(removePrivilegesDto);
  }


  @ApiResponse({
    status: 200,
    description: 'Create Successful',
    type: User,
    example: {
      "id": 40,
      "name": "Usuario 2",
      "email": "dtm@gmail.com",
      "details": null,
      "status": "ACTIVE",
      "privileges": [
        "ALL_PRIVILEGES",
        "COMERCIAL"
      ]
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
  @Auth(ItPrivileges.ALL_PRIVILEGES)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Find All Successful',
    example: {
      "data": [
        {
          "id": 48,
          "name": "Usuario 2",
          "email": "dtm@gmail.com",
          "details": null,
          "status": "ACTIVE",
          "privileges": [
            "ALL_PRIVILEGES"
          ],
          "url": "https://drive.google.com/file/d/profile-default.png"
        },
        {
          "id": 49,
          "name": "User 1",
          "email": "belen512@gmail.com",
          "details": "asdfsdfsdjf",
          "status": "INACTIVE",
          "privileges": [
            "OBSERVER"
          ],
          "url": "https://drive.google.com/file/d/profile-default.png"
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
  @ApiResponse({
    status: 204,
    description: 'No Content',
    example: ''
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Status del usuario',
    enum: UserStatus,
    example: UserStatus.ACTIVE
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
  findAll(@Query() findAllUserDto: FindAllUserDto) {
    return this.usersService.findAll(findAllUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Find One Successful',
    type: User,
    example: {
      "id": 48,
      "name": "Usuario 2",
      "email": "dtm@gmail.com",
      "details": null,
      "status": "ACTIVE",
      "privileges": [
        "ALL_PRIVILEGES"
      ],
      "url": "https://drive.google.com/file/d/profile-default.png"
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/users/#",
      "message": "No existe el usuario con id: #"
    }
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del usuario',
    example: 48
  })
  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }


  @ApiResponse({
    status: 200,
    description: 'Update Successful',
    type: User,
    example: {
      "id": 48,
      "name": "Usuario 2",
      "email": "dtm@gmail.com",
      "details": null,
      "status": "ACTIVE",
      "privileges": [
        "ALL_PRIVILEGES"
      ],
      "url": "https://drive.google.com/file/d/profile-default.png"
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/users/#",
      "message": "No existe el usuario con id: #"
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
    description: 'Id del usuario',
    example: 48
  })
  @Patch(':id')
  @Auth()
  update(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, user, updateUserDto);
  }


  @ApiResponse({
    status: 200,
    description: 'Remove Successful',
    type: User,
    example: {
      message: "User with id: 48 has been soft/hard deleted "
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/users/#",
      "message": "No existe el usuario con id: #"
    }
  })
  @ApiResponse({
    status: 412,
    description: 'Precondition Failed',
    example: {
      "statusCode": 412,
      "timestamp": "2024-10-03T23:03:59.052Z",
      "message": "update or delete on table \"name of table \" violates foreign key constraint \"FK_ id of the foreign constraint\" on table \"name of the referenced table\"",
      "details": {
        "severity": "Severity of the error",
        "code": "PSQL error code",
        "detail": "Key (name of key)=(value of key) is still referenced from table \"name of table\".",
        "schema": "name of schema",
        "table": "name of table",
        "constraint": "FK_ id of the foreign constraint",
        "routine": "name of psql routine"
      }
    }
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del usuario',
    example: 48
  })
  @ApiQuery({
    name: 'depth',
    required: false,
    description: 'Tipo de borrado (soft/hard)',
    example: "soft"
  })
  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Query('depth') depth: tpDepth) {
    if (depth && !['soft', 'hard'].includes(depth)) {
      throw new HttpException({ message: 'El parámetro depth debe ser soft o hard' }, HttpStatus.BAD_REQUEST);
    }
    return this.usersService.remove(id, user, depth);
  }

}
