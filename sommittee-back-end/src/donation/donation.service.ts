import { Injectable } from '@nestjs/common';
import { DonationRepository } from './repositories/donation.repository';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { QueryDonationDto } from './dto/query-donation.dto';

@Injectable()
export class DonationService {
  constructor(private readonly repository: DonationRepository) {}

  async create(
    createDonationDto: CreateDonationDto,
    donationProducts: { product_id: string; amount: number }[],
  ) {
    return await this.repository.create(createDonationDto, donationProducts);
  }

  async findAll(querydto: QueryDonationDto = {}) {
    return await this.repository.findAll(querydto);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(
    id: string,
    updateDonationDto: UpdateDonationDto,
    updatedDonationProducts: { product_id: string; amount: number }[],
  ) {
    return await this.repository.update(
      id,
      updateDonationDto,
      updatedDonationProducts,
    );
  }

  async updateDonation(
    donationId: string,
    updateDonationDto: UpdateDonationDto,
    updatedProducts: { product_id: string; amount: number }[],
  ) {
    try {
      const donation = await this.repository.update(
        donationId,
        updateDonationDto,
        updatedProducts,
      );
      return donation;
    } catch (error) {
      throw new Error(`Erro ao atualizar a doação: ${error.message}`);
    }
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
