import { ApiProperty } from "@nestjs/swagger";
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

export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED'
}

@Entity()
export class Product {

    @ApiProperty({
        description: 'Id del producto',
        example: 40
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Producto 1'
    })
    @Column('text', {
        unique: true,
        nullable: false
    })
    name: string;


    @ApiProperty({
        description: 'Descripcion del producto',
        example: 'Descripcion del producto'
    })
    @Column('text', {
        nullable: true
    })
    description: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 20.99
    })
    @Column('numeric', {
        nullable: false,
    })
    price: number;

    @ApiProperty({
        description: 'Categoria del producto',
        example: ProductCategory.Electronics,
        enum: ProductCategory
    })
    @Column('enum', {
        enum: ProductCategory,
        nullable: false
    })
    category: ProductCategory;

    @ApiProperty({
        description: 'Url del producto',
        example: 'https://drive.google.com/file/d/product-default.png'
    })
    @Column('text', {
        nullable: true
    })
    url: string;

    @ApiProperty({
        description: 'Estado del producto',
        example: ProductStatus.ACTIVE,
        enum: ProductStatus
    })
    @Column('enum', {
        enum: ProductStatus,
        default: ProductStatus.ACTIVE
    })
    status: ProductStatus;

    @ManyToOne(() => User, (user) => user.products)
    user: User;

}
