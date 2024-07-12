import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAttachmentDto } from "../dto/create-attachment.dto";
import { AttachmentEntity } from "../entities/attachment.entity";
import { UpdateAttachmentDto } from "../dto/update-attachment.dto";


@Injectable()
export class AttachmentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAttchmentDto: CreateAttachmentDto): Promise<AttachmentEntity> {
    return await this.prisma.attachment.create({ data: createAttchmentDto })
  }

  async findAll(): Promise<AttachmentEntity[]> {
    return await this.prisma.attachment.findMany()
  }

  async findById(id: string): Promise<AttachmentEntity> {
    return await this.prisma.attachment.findFirst({ where: { id } })
  }

  async update(id: string, updateAttachmentDto: UpdateAttachmentDto): Promise<AttachmentEntity> {
    return await this.prisma.attachment.update({ where: { id }, data: updateAttachmentDto })
  }

  async remove(id: string): Promise<AttachmentEntity> {
    return await this.prisma.attachment.delete({ where: { id } })
  }
}