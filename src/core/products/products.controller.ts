import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../../repository/products.repository';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsSvc:ProductsService
    ){

    }

    @Post('create')
    async CreateData(@Body() product:Products){
        return this.productsSvc.createProducts(product)
    }

    @Patch()
    async UpdateData(@Body() body:{product:Products,query:any}){
        const {product,query}=body
        return this.productsSvc.updateProduct(product,query)
    }

    @Post('findByFilter')
    async GetData(@Body() query:any){
        return this.productsSvc.getProducts(query)
    }

    @Delete()
    async DeleteData(@Body() query:any){
        return this.productsSvc.removeProduct(query)
    }

    @Post('bulkData')
    async BulkData(@Body() products:Products[]){
        return this.productsSvc.BulkData(products);
    }
}
