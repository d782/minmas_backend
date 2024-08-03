import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../repository/users.repository';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>
    ){

    }


    async createUser(user:Users){
        try {
            return await this.userRepository.save(user)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async updateUser(user:Users,query:any){
        try {
            return await this.userRepository.update(query,user);
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)     
        }
    }

    async removeUser(query){
        try {
            return await this.userRepository.delete(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR)  
        }
    }

    async getUsers(query:FindManyOptions){
        try {
            return await this.userRepository.find(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}
