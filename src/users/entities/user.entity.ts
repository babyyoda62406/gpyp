import { ItPrivileges  as UserPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStatus{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED'
}





@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        unique: false,
    })
    name: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {
        unique: false,
        nullable: false,
    })    
    password: string;

    @Column('text', {nullable: true})
    details: string;

    @Column('enum', { enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @Column('enum', {
        enum: UserPrivileges,
        array: true,
        default: [UserPrivileges.OBSERVER]
    })
    privileges: UserPrivileges[];
}
