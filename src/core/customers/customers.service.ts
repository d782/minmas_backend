import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/repository/customers.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customers) private customersRepository: Repository<Customers>
    ){

    }


    async createCustomer(customers:Customers){
        try {
            return await this.customersRepository.save(customers)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async updateCustomer(customer:Customers,query:string){
        try {
            return await this.customersRepository.update(query,customer)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)     
        }
    }

    async removeCustomer(query){
        try {
            return await this.customersRepository.delete(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)  
        }
    }

    async getCustomers(query){
        try {
            return await this.customersRepository.find(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}
