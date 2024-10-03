import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication, PublicationStatus } from './entities/publication.entity';
import { UsersService } from 'src/users/users.service';
import { ItFindAllResponse } from 'src/common/interfaces/ItFindAllResponse';
import { FindAllPublicationDto } from './dto/find-all-publication.dto';
import { User } from 'src/users/entities/user.entity';
import { ItPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { tpDepth } from 'src/common/types/tpDepth';

@Injectable()
export class PublicationsService {

  constructor(
    @InjectRepository(Publication) private readonly DAO: Repository<Publication>,
    private readonly usersService: UsersService
  ) {}

  async create(createPublicationDto: CreatePublicationDto , autorId: number) {
    const tempUser  = await this.usersService.findOne(autorId);
    const tempPublication = await this.DAO.save({
      ...createPublicationDto,
      user: tempUser
    });
    delete tempPublication.user;
    return { ...tempPublication, autorId: tempUser.id  , autorName: tempUser.name };
  }

  async findAll(findAllPublicationDto: FindAllPublicationDto): Promise<ItFindAllResponse<Publication>> {

    const { page, size, status } = findAllPublicationDto;

    const total = await this.DAO.count({
      where: {
        ...(status ? { status: status } : {})
      }
    });

    const publications: Publication[] = await this.DAO.find({
      where: {
        ...(status ? { status: status } : {})
      },
      order: {
        id: 'asc'
      },
      skip: (page - 1) * size,
      take: size
    });

    if (!publications.length) throw new HttpException('', HttpStatus.NO_CONTENT);

    const metadata = {
      records: total,
      frame: page,
      frameSize: size,
      lastFrame: Math.ceil(total / size)
    };

    return { data: publications, metadata };
  }

  async findOne(id: number) {
    const publication: Publication = await this.DAO.findOne({
      where: {
        id: id
      },
      relations: ['user']
    });

    if (!publication) throw new HttpException({ message: `No existe la publicación con id: ${id}` }, HttpStatus.NOT_FOUND);
    delete publication.user.privileges;
    return publication;
  }

  async update(id: number, user: User, updatePublicationDto: UpdatePublicationDto) {
    if (!Object.keys(updatePublicationDto).length) throw new HttpException({ message: `Debe proporcionar al menos un campo para actualizar` }, HttpStatus.BAD_REQUEST);
    let tempPublication = await this.findOne(id);

    const allPrivileges = user.privileges.includes(ItPrivileges.ALL_PRIVILEGES);

    if (!allPrivileges) {
      if (tempPublication.user.id !== user.id) throw new HttpException({ message: `No tiene permisos para editar esta publicación` }, HttpStatus.FORBIDDEN);
    }

    await this.DAO.update(id, {
      ...updatePublicationDto
    });

    tempPublication = await this.findOne(id);
    delete tempPublication.user.privileges;

    return { message: `Publicación Editada`, publication: tempPublication };
  }

  async remove(id: number, user: User, depth: tpDepth = 'soft') {

    const allPrivileges = user.privileges.includes(ItPrivileges.ALL_PRIVILEGES);
    const tempPublication = await this.findOne(id);

    if(tempPublication.status === PublicationStatus.DELETED) throw new HttpException({ message: `No existe la publicación con  id: ${id}` }, HttpStatus.BAD_REQUEST);

    if (!allPrivileges) {
      if (user.id !== tempPublication.user.id) throw new HttpException({ message: `No tiene permisos para eliminar esta publicación` }, HttpStatus.FORBIDDEN);
    }

    switch (depth) {
      case 'soft':
        tempPublication.status = PublicationStatus.DELETED;
        await this.DAO.save(tempPublication);
        break;
      case 'hard':
        await this.DAO.delete(id);
        break;
      default:
        tempPublication.status = PublicationStatus.DELETED;
        await this.DAO.save(tempPublication);
        break;
    }

    return { message: `Publication with id: ${id} has been  ${depth} deleted` };
  }
}
