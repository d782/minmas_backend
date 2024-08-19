import {Column,PrimaryGeneratedColumn,Entity, OneToOne, JoinColumn} from 'typeorm';
import { Customers } from './customers.repository';

@Entity()
export class Invoices {
    @PrimaryGeneratedColumn()
    factura_id: number;

    @Column()
    total: number;

    @OneToOne(type=>Customers,{onDelete:"CASCADE"})
    @JoinColumn({name:"customer_id"})
    customer_id: Customers;

    @Column()
    created_at: Date;
}