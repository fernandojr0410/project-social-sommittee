import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { stock, ...productData } = createProductDto;

    return await this.prisma.$transaction(async (prisma) => {
      const createdProduct = await prisma.product.create({
        data: {
          ...productData,
          stocks: {
            create: {
              amount: stock.amount,
              donation_id: stock.donation_id || null,
            },
          },
        },
        include: {
          stocks: true,
        },
      });

      return createdProduct;
    });
  }



  async findAll(query: any): Promise<ProductEntity[]> {
    const _query: any = {
      include: {
        stocks: {
          select: {
            amount: true,
            donation_id: true
          }
        }
      }
    };

    if (query.searchField && query.search) {
      _query.where = {
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive'
        }
      };
    }

    return await this.prisma.product.findMany(_query);
  }
  

  async findById(id: string): Promise<ProductEntity> {
    return await this.prisma.product.findFirst({ where: { id } })
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return await this.prisma.product.update({ where: { id }, data: updateProductDto })
  }

  async remove(id: string): Promise<ProductEntity> {
    return await this.prisma.product.delete({ where: { id } })
  }
}