import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm';

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    customer_id: number;

    @Column()
    full_name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;
}