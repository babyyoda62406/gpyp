import { ItPrivileges  as UserPrivileges } from 'src/auth/interfaces/ItPrivileges';
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
        select: false
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

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];
}
