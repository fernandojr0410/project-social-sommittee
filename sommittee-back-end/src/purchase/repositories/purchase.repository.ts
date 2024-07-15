import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePurchaseDto } from "../dto/create-purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { UpdatePurchaseDto } from "../dto/update-purchase.dto";


@Injectable()
export class PurchaseRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseEntity> {
    return await this.prisma.purchase.create({ data: createPurchaseDto })
  }

  async findAll(): Promise<PurchaseEntity[]> {
    return await this.prisma.purchase.findMany()
  }

  async findById(id: string): Promise<PurchaseEntity> {
    return await this.prisma.purchase.findFirst({ where: { id } })
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<PurchaseEntity> {
    return await this.prisma.purchase.update({ where: { id }, data: updatePurchaseDto })
  }

  async remove(id: string): Promise<PurchaseEntity> {
    return await this.prisma.purchase.delete({ where: { id } })
  }
}