import { Injectable } from "@nestjs/common";
import { DonationRepository } from "./repositories/donation.repository";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";
import { QueryDonationDto } from "./dto/query-donation.dto";


@Injectable()
export class DonationService {
  constructor(private readonly repository: DonationRepository) { }

  async create(createDonationDto: CreateDonationDto) {
    return await this.repository.create(createDonationDto)
  }

  async findAll(querydto: QueryDonationDto = {}) {
    return await this.repository.findAll(querydto)
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  async update(id: string, updateDonationDto: UpdateDonationDto) {
    return await this.repository.update(id, updateDonationDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}