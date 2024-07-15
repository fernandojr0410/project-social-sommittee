import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReceiptDto } from "../dto/create-receipt.dto";
import { ReceiptEntity } from "../entities/receipt.entity";
import { UpdateReceiptDto } from "../dto/update-receipt.dto";


@Injectable()
export class ReceiptRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createReceiptDto: CreateReceiptDto): Promise<ReceiptEntity> {
    return await this.prisma.receipt.create({ data: createReceiptDto })
  }

  async findAll(): Promise<ReceiptEntity[]> {
    return await this.prisma.receipt.findMany()
  }

  async findById(id: string): Promise<ReceiptEntity> {
    return await this.prisma.receipt.findFirst({ where: { id } })
  }

  async update(id: string, updateReceiptDto: UpdateReceiptDto): Promise<ReceiptEntity> {
    return await this.prisma.receipt.update({ where: { id }, data: updateReceiptDto })
  }

  async remove(id: string): Promise<ReceiptEntity> {
    return await this.prisma.receipt.delete({ where: { id } })
  }
}