import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { FindAllPublicationDto } from './dto/find-all-publication.dto';
import { User } from 'src/users/entities/user.entity';
import { tpDepth } from 'src/common/types/tpDepth';
import {  ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Publication, PublicationStatus } from './entities/publication.entity';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @ApiResponse({
    status: 200,
    description: 'Create Successful',
    type: Publication,
    example: {
      "title": "Publicacion 1",
      "topic": "L & D ",
      "description": null,
      "url": null,
      "id": 2,
      "createAt": "2024-10-04T04:23:56.777Z",
      "status": "ACTIVE",
      "autorId": 48,
      "autorName": "Usuario 2"
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
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.EDITOR)
  create(@Body() createPublicationDto: CreatePublicationDto, @GetUser('id') autorId:number) {
    return this.publicationsService.create(createPublicationDto, autorId);
  }

  @ApiResponse({
    status: 200,
    description: 'Find All Successful',
    example: {
      "data": [
        {
          "title": "Publicacion 1",
          "topic": "L & D ",
          "description": null,
          "url": null,
          "id": 2,
          "createAt": "2024-10-04T04:23:56.777Z",
          "status": "ACTIVE",
          "autorId": 48,
          "autorName": "Usuario 2"
        },
        {
          "title": "Publicacion 2",
          "topic": "L & D ",
          "description": null,
          "url": null,
          "id": 3,
          "createAt": "2024-10-04T04:23:56.777Z",
          "status": "ACTIVE"
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
    description: 'Estado de la publicación',
    enum: PublicationStatus,
    example: PublicationStatus.ACTIVE
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
  findAll(@Query() findAllPublicationDto: FindAllPublicationDto) {
    return this.publicationsService.findAll(findAllPublicationDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Find One Successful',
    type: Publication,
    example: {
      "title": "Publicacion 1",
      "topic": "L & D ",
      "description": null,
      "url": null,
      "id": 2,
      "createAt": "2024-10-04T04:23:56.777Z",
      "status": "ACTIVE"
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/publications/#",
      "message": "No existe la publicación con id: #"
    }
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la publicación',
    example: 2
  })
  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update Successful',
    type: Publication,
    example: {
      "message": "Publicación Editada",
      "publication": {
        "id": 2,
        "title": "Publicacion 1",
        "topic": "L & D ",
        "description": null,
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
      "path": "/api/v1/publications/#",
      "message": "No existe la publicación con id: #"
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
    description: 'Id de la publicación',
    example: 2
  })  
  @Patch(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.EDITOR)
  update(@Param('id', ParseIntPipe) id: number,@GetUser() user: User, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(id, user , updatePublicationDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove Successful',
    type: Publication,
    example: {
      "message": "Publication with id: 2 has been  soft/hard deleted "
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    example: {
      "statusCode": 404,
      "timestamp": "2024-10-03T22:21:30.300Z",
      "path": "/api/v1/publications/#",
      "message": "No existe la publicación con id: #"
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
    description: 'Id de la publicación',
    example: 2
  })
  @ApiQuery({
    name: 'depth',
    required: false,
    description: 'Tipo de borrado (soft/hard)',
    example: "soft"
  })
  @Delete(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.EDITOR)
  remove(@Param('id' , ParseIntPipe) id: number, @GetUser() user: User ,  @Query('depth') depth: tpDepth) {
    if(depth && !['soft', 'hard'].includes(depth)) {
      throw new HttpException({message:'El parámetro depth debe ser soft o hard'}, HttpStatus.BAD_REQUEST);
    }

    return this.publicationsService.remove(id, user, depth);
  }
}
