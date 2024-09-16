import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PrismaService } from '../prisma/prisma.service';
import { StockRepository } from './repositories/stock.repository';

@Module({
  imports: [],
  providers: [StockService, PrismaService, StockRepository],
  controllers: [StockController],
})
export class StockModule { }
