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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.EDITOR)
  create(@Body() createPublicationDto: CreatePublicationDto, @GetUser('id') autorId:number) {
    return this.publicationsService.create(createPublicationDto, autorId);
  }

  @Get()
  @Auth()
  findAll(@Query() findAllPublicationDto: FindAllPublicationDto) {
    return this.publicationsService.findAll(findAllPublicationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.EDITOR)
  update(@Param('id', ParseIntPipe) id: number,@GetUser() user: User, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(id, user , updatePublicationDto);
  }

  @Delete(':id')
  @Auth(ItPrivileges.ALL_PRIVILEGES, ItPrivileges.EDITOR)
  remove(@Param('id' , ParseIntPipe) id: number, @GetUser() user: User ,  @Query('depth') depth: tpDepth) {
    if(depth && !['soft', 'hard'].includes(depth)) {
      throw new HttpException({message:'El parámetro depth debe ser soft o hard'}, HttpStatus.BAD_REQUEST);
    }

    return this.publicationsService.remove(id, user, depth);
  }
}
