import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PublicationStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED'
}

@Entity()
export class Publication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false, 
        unique: true
    })
    title: string;


    @Column('text', {
        nullable: false, 
        unique: false
    })
    topic: string;

    @Column('text', {
        nullable: true,
    })
    description: string;

    @Column('text', {
        nullable: true,
    })
    url: string;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date;

    @Column('enum', {
        enum: PublicationStatus,
        default: PublicationStatus.ACTIVE
    })
    status: PublicationStatus;

    @ManyToOne(() => User, (user) => user.publications)
    user: User;

}
