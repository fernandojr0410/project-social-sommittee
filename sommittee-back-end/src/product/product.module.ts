import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [],
  providers: [ProductService, PrismaService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule { }
