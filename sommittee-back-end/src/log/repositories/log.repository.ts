import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateLogDto } from "../dto/create-log.dto";
import { LogEntity } from "../entities/log.entity";
import { UpdateLogDto } from "../dto/update-log.dto";

@Injectable()
export class LogRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLogDto: CreateLogDto): Promise<LogEntity> {
    return await this.prisma.logger.create({ data: createLogDto })
  }

  async findAll(): Promise<LogEntity[]> {
    return await this.prisma.logger.findMany()
  }

  async findOne(id: string): Promise<LogEntity> {
    return await this.prisma.logger.findFirst({ where: { id } })
  }

  async update(id: string, updateLogDto: UpdateLogDto): Promise<LogEntity> {
    return await this.prisma.logger.update({ where: { id }, data: updateLogDto })
  }

  async remove(id: string) {
    return await this.prisma.logger.delete({ where: { id } })
  }
}