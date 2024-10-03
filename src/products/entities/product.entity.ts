import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ProductCategory {
    Electronics = 'Electronics',
    Toys = 'Toys',
    Books = 'Books',
    Movies = 'Movies',
    Clothes = 'Clothes',
    Food = 'Food',
    Sports = 'Sports',
    Music = 'Music',
    Computers = 'Computers',
    Hobbies = 'Hobbies',
    Tools = 'Tools',
    Home = 'Home',
    Beauty = 'Beauty',
    Health = 'Health',
    Garden = 'Garden',
    Pets = 'Pets',
    Others = 'Others'
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        unique: true, 
        nullable: false
    })
    name: string;
    
    @Column('text', {
        nullable: true
    })
    description: string;

    @Column('numeric', {
        nullable: false, 
    })
    price: number;

    @Column('enum', {
        enum: ProductCategory,
        nullable: false
    }) 
    category: ProductCategory;

    @Column('text', {
        nullable: true
    })
    url: string;

    @ManyToOne(() => User, (user) => user.products)
    user: User;

}
