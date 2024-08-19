import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../repository/users.repository';
import { FindManyOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    //testing purpose
    passHash="moscow";
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private jwtService:JwtService
    ){

    }


    async createUser(user:Users){
        try {
            if(!user.user_id){
                user.pwd=await bcrypt.hash(user.pwd,10);
            }
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

    async getUsers(query:FindManyOptions):Promise<Users[]|HttpException> {
        try {
            return await this.userRepository.find(query)
        } catch (error) {
            return new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }

    async Login(query:FindManyOptions){
        const errAuth=new HttpException({error:"Password o email invalido!"},HttpStatus.UNAUTHORIZED)
        try{
            const email=query.where["email"];
            //buscar si el usuario se encuentra registrado
            const findUser=await this.getUsers({where:{email}}) as Users[];
            //validar si el usuario existe
            if(findUser && findUser.length){
                const pwd=query.where["pwd"];
                //validar el password por encriptación
                const isValid=await bcrypt.compare(pwd,findUser[0].pwd);
                //validar si el password es valido
                if(isValid){
                    //finalmente se envía el token de autorización al usuario
                    const token=await this.getToken(findUser[0]);
                    return token; 
                }
                throw  errAuth;
            }else{
                throw errAuth;
            }
        }
        catch(error){
            throw new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }

    async getToken(user:Users){
        try {
            const payload={
                user_id:user.user_id,
                user_name:user.user_name
            };
            const sign=await this.jwtService.sign(payload);
            return {
                token:sign
            }
        } catch (error) {
            throw new HttpException({data:error},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}
