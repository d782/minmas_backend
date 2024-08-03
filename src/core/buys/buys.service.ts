import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buys } from '../../repository/buys.repository';
import { FindManyOptions, Repository } from 'typeorm';


@Injectable()
export class BuysService {
    constructor(
        @InjectRepository(Buys) private buysRepository: Repository<Buys>
    ){

    }


    async createBuy(buy:Buys){
        try {
            return await this.buysRepository.save(buy)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async updateBuy(buy:Buys,query:string){
        try {
            return await this.buysRepository.update(query,buy)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)     
        }
    }

    async removeBuy(query){
        try {
            return await this.buysRepository.delete(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)  
        }
    }

    async getBuys(query:FindManyOptions){
        try {
            return await this.buysRepository.find(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }

    async BulkData(buys:Buys[]){
        try {
            let results:Buys[]=[];
            for await(let buy of buys){
                let res=null;
                if(!buy.buy_id){
                    res= await this.buysRepository.save(buy);
                }else{
                    res= await this.buysRepository.update({"buy_id":buy.buy_id},buy)
                }
                results.push(res); 
            }
            return results;
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
