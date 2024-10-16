import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductDashboardDto } from '../dto/dashboard-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, type } = createProductDto;

    return await this.prisma.$transaction(async (prisma) => {
      const createdProduct = await prisma.product.create({
        data: {
          name,
          description,
          type,
        },
      });

      await prisma.stock.create({
        data: {
          product_id: createdProduct.id,
          amount: new Decimal(0),
        },
      });

      return createdProduct;
    });
  }

  async findAll(query: any): Promise<ProductEntity[]> {
    const _query: any = {
      include: {
        stocks: true,
      },
    };

    if (query.searchField && query.search) {
      _query.where = {
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive',
        },
      };
    }

    return await this.prisma.product.findMany(_query);
  }

  async findAllWithStock(): Promise<any> {
    return await this.prisma.product.findMany({
      include: {
        stocks: true,
      },
    });
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        stocks: true,
      },
    });

    return product;
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const { name, description, type } = updateProductDto;

    return await this.prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        type,
      },
    });
  }

  async remove(id: string): Promise<ProductEntity> {
    await this.prisma.stock.deleteMany({
      where: { product_id: id },
    });

    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
