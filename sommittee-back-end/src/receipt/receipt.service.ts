import { Injectable } from "@nestjs/common";
import { ReceiptRepository } from "./repositories/receipt.repository";
import { CreateReceiptDto } from "./dto/create-receipt.dto";
import { UpdateReceiptDto } from "./dto/update-receipt.dto";


@Injectable()
export class ReceiptService {
  constructor(private readonly repository: ReceiptRepository) { }

  async create(createReceiptDto: CreateReceiptDto) {
    return await this.repository.create(createReceiptDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  async update(id: string, updateReceiptDto: UpdateReceiptDto) {
    return await this.repository.update(id, updateReceiptDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}