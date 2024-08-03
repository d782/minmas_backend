import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { BuysService } from './buys.service';
import { Buys } from '../../repository/buys.repository';

@Controller('buys')
export class BuysController {
    constructor(
        private readonly buySvc:BuysService
    ){

    }

    @Post('create')
    async CreateData(@Body() buy:Buys){
        return this.buySvc.createBuy(buy)
    }

    @Patch()
    async UpdateData(@Body() body:{buy:Buys,query:any}){
        const {buy,query}=body
        return this.buySvc.updateBuy(buy,query)
    }

    @Post('findByFilter')
    async GetData(@Body() query:any){
        return this.buySvc.getBuys(query)
    }

    @Delete()
    async DeleteData(@Body() query:any){
        return this.buySvc.removeBuy(query)
    }

    @Post('bulkData')
    async BulkData(@Body() buys:Buys[]){
        return this.buySvc.BulkData(buys)
    }
}
