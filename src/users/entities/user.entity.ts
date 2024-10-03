import { ApiProperty } from '@nestjs/swagger';
import { ItPrivileges  as UserPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { Product } from 'src/products/entities/product.entity';
import { Publication } from 'src/publications/entities/publication.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserStatus{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED'
}





@Entity()
export class User {
    @ApiProperty(
        {
            description: 'Id del usuario',
            example: 40
        }
    )
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Usuario 1'
    })  
    @Column('text', {
        unique: false,
    })
    name: string;

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@email.com'
    })
    @Column('text', {unique: true})
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '123456'
    })
    @Column('text', {
        unique: false,
        nullable: false,
        select: false
    })    
    password: string;

    @ApiProperty({
        description: 'Detalles del usuario',
        example: 'Detalles del usuario'
    })
    @Column('text', {nullable: true})
    details: string;

    @ApiProperty({
        description: 'Estado del usuario',
        example: 'ACTIVE',
        enum: UserStatus
    })
    @Column('enum', { enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @ApiProperty({
        description: 'Privilegios del usuario',
        example: [UserPrivileges.ALL_PRIVILEGES, UserPrivileges.COMERCIAL],
        enum: UserPrivileges
    })
    @Column('enum', {
        enum: UserPrivileges,
        array: true,
        default: [UserPrivileges.OBSERVER]
    })
    privileges: UserPrivileges[];

    @ApiProperty({
        description: 'Url de la imagen del usuario',
        example: 'https://drive.google.com/file/d/profile-default.png'
    })
    @Column('text', {
        default: 'https://drive.google.com/file/d/profile-default.png'
    })
    url:string; 

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(()=> Publication , (publication) => publication.user)
    publications: Publication[];
}
