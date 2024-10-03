import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm';

@Entity()
export class  Users{
    @PrimaryGeneratedColumn()
    user_id?: number;

    @Column()
    pwd: string;

    @Column()
    email: string;

    @Column()
    enabled: number;

    @Column()
    user_name: string;

    @Column()
    surename:string;
    
    @Column()
    document:string;
    
    @Column()
    birth_date:string;
}