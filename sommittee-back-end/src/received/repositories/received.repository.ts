import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReceivedDto } from "../dto/create-received.dto";
import { ReceivedEntity } from "../entities/received.entity";
import { UpdateReceivedDto } from "../dto/update-received.dto";


@Injectable()
export class ReceivedRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createReceivedDto: CreateReceivedDto): Promise<ReceivedEntity> {
    return await this.prisma.received.create({ data: createReceivedDto })
  }

  async findAll(): Promise<ReceivedEntity[]> {
    return await this.prisma.received.findMany()
  }

  async findById(id: string): Promise<ReceivedEntity> {
    return await this.prisma.received.findFirst({ where: { id } })
  }

  async update(id: string, updateReceivedDto: UpdateReceivedDto): Promise<ReceivedEntity> {
    return await this.prisma.received.update({ where: { id }, data: updateReceivedDto })
  }

  async remove(id: string): Promise<ReceivedEntity> {
    return await this.prisma.received.delete({ where: { id } })
  }
}