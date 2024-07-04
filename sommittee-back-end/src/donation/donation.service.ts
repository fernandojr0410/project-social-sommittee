import { Injectable } from "@nestjs/common";
import { DonationRepository } from "./repositories/donation.repository";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";


@Injectable()
export class DonationService {
  constructor(private readonly repository: DonationRepository) { }

  async create(createDonationDto: CreateDonationDto) {
    return await this.repository.create(createDonationDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  async update(id: string, updateDonationDto: UpdateDonationDto) {
    return await this.repository.update(id, updateDonationDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}