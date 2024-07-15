import { Injectable } from "@nestjs/common";
import { PurchaseRepository } from "./repositories/purchase.repository";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { UpdatePurchaseDto } from "./dto/update-purchase.dto";


@Injectable()
export class PurchaseService {
  constructor(private readonly repository: PurchaseRepository) { }

  async create(createPurchaseDto: CreatePurchaseDto) {
    return await this.repository.create(createPurchaseDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return await this.repository.update(id, updatePurchaseDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}