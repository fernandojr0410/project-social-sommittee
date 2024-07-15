import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PurchaseRepository } from './repositories/purchase.repository';

@Module({
  imports: [],
  providers: [PurchaseService, PrismaService, PurchaseRepository],
  controllers: [PurchaseController],
})
export class PurchaseModule { }
