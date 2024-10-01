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

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()    
    password: string;

    @Column({nullable: true})
    details: string;

    @Column({default: UserStatus.ACTIVE})
    status: UserStatus;
}
