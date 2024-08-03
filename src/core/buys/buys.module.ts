import { Module } from '@nestjs/common';
import { BuysService } from './buys.service';
import { BuysController } from './buys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buys } from '../../repository/buys.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [Buys]
    )
  ],
  providers: [BuysService],
  controllers: [BuysController]
})
export class BuysModule {}
