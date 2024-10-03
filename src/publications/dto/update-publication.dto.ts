import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import {  PublicationStatus } from '../entities/publication.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
    @IsEnum(PublicationStatus)
    @IsOptional()
    status: PublicationStatus
}
