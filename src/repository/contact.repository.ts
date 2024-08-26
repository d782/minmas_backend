import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Contact{
    @PrimaryGeneratedColumn()
    contact_id:string

    @Column()
    email:string;

    @Column()
    name:string;

    @Column()
    phone:string;

    @Column()
    description_info:string;
}