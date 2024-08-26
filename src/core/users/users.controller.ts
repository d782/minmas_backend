import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { Users } from '../../repository/users.repository';
import { UsersService } from './users.service';
import { Contact } from '../../repository/contact.repository';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userSvc:UsersService
    ){

    }

    @Post('create')
    async CreateData(@Body() user:Users){
        return this.userSvc.createUser(user)
    }

    @Patch()
    async UpdateData(@Body() body:{user:Users,query:any}){
        const {user,query}=body
        return this.userSvc.updateUser(user,query)
    }

    @Post('getByFilter')
    async GetData(@Body() query:any){
        return this.userSvc.getUsers(query)
    }

    @Delete()
    async DeleteData(@Body() query:any){
        return this.userSvc.removeUser(query)
    }

    @Post('login')
    async Login(@Body() query){
        return this.userSvc.Login(query);
    }

    @Post('contact')
    async Contact(@Body() contact:Contact){
        return this.userSvc.ContactInfo(contact)
    }
}
