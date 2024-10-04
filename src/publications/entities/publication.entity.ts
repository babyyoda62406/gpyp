import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PublicationStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED'
}

@Entity()
export class Publication {
    @ApiProperty({
        description: 'Id de la publicación',
        example: 2
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Título de la publicación',
        example: 'Publicacion 1'
    })
    @Column('text', {
        nullable: false, 
        unique: true
    })
    title: string;


    @ApiProperty({
        description: 'Tema de la publicación',
        example: 'Tecnología'
    })
    @Column('text', {
        nullable: false, 
        unique: false
    })
    topic: string;

    @ApiProperty({
        description: 'Descripción de la publicación',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    })
    @Column('text', {
        nullable: true,
    })
    description: string;

    @ApiProperty({
        description: 'Url de la publicación',
        example: 'https://drive.google.com/file/d/publication-default.png'
    })
    @Column('text', {
        nullable: true,
    })
    url: string;

    
    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date;

    @ApiProperty({
        description: 'Estado de la publicación',
        example: PublicationStatus.ACTIVE,
        enum: PublicationStatus
    })
    @Column('enum', {
        enum: PublicationStatus,
        default: PublicationStatus.ACTIVE
    })
    status: PublicationStatus;

    @ManyToOne(() => User, (user) => user.publications)
    user: User;

}
