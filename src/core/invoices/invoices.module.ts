import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoices } from '../../repository/invoices.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [Invoices]
    )
  ],
  providers: [InvoicesService],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
