import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return await this.prisma.product.create({ data: createProductDto })
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.prisma.product.findMany()
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