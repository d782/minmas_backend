import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from '../../repository/customers.repository';

@Controller('customers')
export class CustomersController {
    constructor(
        private readonly customerSvc:CustomersService
    ){

    }


    @Post('create')
    async createCustomer(@Body() customer:Customers){
        return this.customerSvc.createCustomer(customer)
    }

    @Patch()
    async updateCustomer(@Body() body:{customer:Customers,query:any}){
        const {customer,query}=body
        return this.customerSvc.updateCustomer(customer,query)
    }

    @Post('findByFilter')
    async GetCustomer(@Body() query:any){
        return this.customerSvc.getCustomers(query)
    }

    @Delete()
    async DeleteCustomer(@Body() query:any){
        return this.customerSvc.removeCustomer(query)
    }
}
