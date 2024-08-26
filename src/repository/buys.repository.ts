import {Entity,Column,PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { Products } from './products.repository';
import { Invoices } from './invoices.repository';


@Entity()
export class Buys{
    @PrimaryGeneratedColumn()
    buy_id: number;

    @ManyToOne(type=>Invoices,{onDelete:"CASCADE"})
    @JoinColumn({name:"factura_id"})
    factura_id: Invoices;

    @Column()
    quantity: number;

    @ManyToOne(type=>Products,{onDelete:"CASCADE"})
    @JoinColumn({name:"product_id"})
    product_id: Products;

    @Column()
    total: number;

    @Column()
    unit: number;
}