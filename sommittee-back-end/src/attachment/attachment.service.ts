import { Injectable } from "@nestjs/common";
import { AttachmentRepository } from "./repositories/attachment.repository";
import { CreateAttachmentDto } from "./dto/create-attachment.dto";
import { UpdateAttachmentDto } from "./dto/update-attachment.dto";


@Injectable()
export class AttachmentService {
  constructor(private readonly repository: AttachmentRepository) { }

  async create(createAttachmentDto: CreateAttachmentDto) {
    return await this.repository.create(createAttachmentDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  async update(id: string, updateAttachmentDto: UpdateAttachmentDto) {
    return await this.repository.update(id, updateAttachmentDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}