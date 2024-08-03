import {Entity,Column,PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { Products } from './products.repository';
import { Invoices } from './invoices.repository';


@Entity()
export class Buys{
    @PrimaryGeneratedColumn()
    buy_id: number;

    @ManyToOne(type=>Invoices)
    @JoinColumn({name:"factura_id"})
    factura_id: Invoices;

    @Column()
    quantity: number;

    @OneToOne(type=>Products)
    @JoinColumn({name:"product_id"})
    product_id: Products;

    @Column()
    total: number;

    @Column()
    unit: number;
}