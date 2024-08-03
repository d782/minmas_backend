import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Invoices } from '../../repository/invoices.repository';

@Controller('invoices')
export class InvoicesController {
    constructor(
        private readonly invoicesSvc:InvoicesService
    ){

    }

    @Post('create')
    async CreateData(@Body() invoice:Invoices){
        return this.invoicesSvc.createInvoice(invoice)
    }

    @Patch()
    async UpdateData(@Body() body:{invoice:Invoices,query:any}){
        const {invoice,query}=body
        return this.invoicesSvc.updateInvoice(invoice,query)
    }

    @Post('findByFilter')
    async GetData(@Body() query:any){
        return this.invoicesSvc.getInvoice(query)
    }

    @Delete()
    async DeleteData(@Body() query:any){
        return this.invoicesSvc.removeInvoice(query)
    }
}
