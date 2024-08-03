import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../repository/products.repository';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Products) private productRepository: Repository<Products>
    ){

    }


    async createProducts(products:Products){
        try {
            return await this.productRepository.save(products)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async updateProduct(product:Products,query:any){
        try {
            return await this.productRepository.update(query,product)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)     
        }
    }

    async removeProduct(query:any){
        try {
            return await this.productRepository.delete(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)  
        }
    }

    async getProducts(query:FindManyOptions){
        try {
            return await this.productRepository.find(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }

    async BulkData(products:Products[]){
        try {
            const results=[];
            for await(let product of products){
                let rs=null;
                if(!product.product_id){
                    rs=await this.productRepository.save(product);
                }else{
                    rs=this.productRepository.update({"product_id":product.product_id},product)
                }
                results.push(rs);
            }
            return results
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}
