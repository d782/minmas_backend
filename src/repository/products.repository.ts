import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    product_id?: number;

    @Column()
    product_name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    buy_cost: number;

    @Column()
    created_at: Date;
}