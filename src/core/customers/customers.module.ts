import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../../repository/customers.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [Customers]
    )
  ],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
