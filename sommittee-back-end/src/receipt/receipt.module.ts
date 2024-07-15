import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReceiptRepository } from './repositories/receipt.repository';

@Module({
  imports: [],
  providers: [ReceiptService, PrismaService, ReceiptRepository],
  controllers: [ReceiptController],
})
export class ReceiptModule { }
