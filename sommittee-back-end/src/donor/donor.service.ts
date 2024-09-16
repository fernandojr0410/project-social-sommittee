import { Injectable } from "@nestjs/common";
import { DonorRepository } from "./repositories/donor.repository";
import { CreateDonorDto } from "./dto/create-donor.dto";
import { UpdateDonorDto } from "./dto/update-donor.dto";
import { QueryDonorDto } from "./dto/query-donor.dto";


@Injectable()
export class DonorService {
  constructor(private readonly repository: DonorRepository) { }

  async create(createDonorDto: CreateDonorDto) {
    return await this.repository.create(createDonorDto)
  }

  async findAll(queryDto: QueryDonorDto = {}) {
    return await this.repository.findAll(queryDto)
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  async update(id: string, updateDonorDto: UpdateDonorDto) {
    return await this.repository.update(id, updateDonorDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}