import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../repository/users.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [Users]
    ),
    JwtModule.register({
      secret:"moscow",
      signOptions:{
        expiresIn:'1d'
      }
    })
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
