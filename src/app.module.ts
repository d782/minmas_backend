import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuysModule } from './core/buys/buys.module';
import { CustomersModule } from './core/customers/customers.module';
import { InvoicesModule } from './core/invoices/invoices.module';
import { ProductsModule } from './core/products/products.module';
import { UsersModule } from './core/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './repository/users.repository';
import { Buys } from './repository/buys.repository';
import { Customers } from './repository/customers.repository';
import { Invoices } from './repository/invoices.repository';
import { Products } from './repository/products.repository';
import { Contact } from './repository/contact.repository';

@Module({
  imports: [
    BuysModule, 
    CustomersModule, 
    InvoicesModule, 
    ProductsModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"mysql-1c26523f-diegocano66-7e81.d.aivencloud.com",
      port:27768,
      username:'avnadmin',
      password:'AVNS_u2CmjCgSQVKpXOz50ef',
      synchronize:true,
      retryAttempts:10,
      entities:[
        Users,
        Buys,
        Customers,
        Invoices,
        Products,
        Contact
      ],
      database:'defaultdb'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//localhost database configuration
/*
      host:"localhost",
      port:3306,
      username:'dbeaver',
      password:'dbeaver',
*/