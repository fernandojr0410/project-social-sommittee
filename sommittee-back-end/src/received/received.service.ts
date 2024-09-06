import { Injectable } from "@nestjs/common";
import { ReceivedRepository } from "./repositories/received.repository";
import { CreateReceivedDto } from "./dto/create-received.dto";


@Injectable()
export class ReceivedService {
  constructor(private readonly repository: ReceivedRepository) { }

  async create(createReceivedDto: CreateReceivedDto) {
    return await this.repository.create(createReceivedDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  // async update(id: string, updateReceivedDto: UpdateReceivedDto) {
  //   return await this.repository.update(id, updateReceivedDto)
  // }

  async remove(id: string) {
    return this.repository.remove(id)
  }
}