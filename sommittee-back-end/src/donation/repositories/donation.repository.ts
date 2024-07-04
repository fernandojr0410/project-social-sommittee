import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateDonationDto } from "../dto/create-donation.dto";
import { DonationEntity } from "../entities/donation.entity";
import { UpdateDonationDto } from "../dto/update-donation.dto";

@Injectable()
export class DonationRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDonationDto: CreateDonationDto): Promise<DonationEntity> {
    return await this.prisma.donation.create({ data: createDonationDto })
  }

  async findAll(): Promise<DonationEntity[]> {
    return await this.prisma.donation.findMany()
  }

  async findOne(id: string): Promise<DonationEntity> {
    return await this.prisma.donation.findFirst({ where: { id } })
  }

  async update(id: string, updateDonationDto: UpdateDonationDto): Promise<DonationEntity> {
    return await this.prisma.donation.update({ where: { id }, data: updateDonationDto })
  }

  async remove(id: string): Promise<DonationEntity> {
    return await this.prisma.donation.delete({ where: { id } })
  }
}