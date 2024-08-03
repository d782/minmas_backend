import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Invoices } from '../../repository/invoices.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoices) private invoiceRepository: Repository<Invoices>
    ){

    }


    async createInvoice(invoice:Invoices){
        try {
            return await this.invoiceRepository.save(invoice)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async updateInvoice(invoice:Invoices,query:string){
        try {
            return await this.invoiceRepository.update(query,invoice)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)     
        }
    }

    async removeInvoice(query){
        try {
            return await this.invoiceRepository.delete(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)  
        }
    }

    async getInvoice(query){
        try {
            return await this.invoiceRepository.find(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}
