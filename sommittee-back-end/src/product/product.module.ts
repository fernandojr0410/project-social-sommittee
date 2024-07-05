import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRepository } from './repositories/product.repository';
import { LogService } from '../log/log.service';
import { LogRepository } from '../log/repositories/log.repository';

@Module({
  imports: [],
  providers: [ProductService, PrismaService, ProductRepository, LogService, LogRepository],
  controllers: [ProductController],
})
export class ProductModule { }
