import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateDonorDto } from "../dto/create-donor.dto";
import { DonorEntity } from "../entities/donor.entity";
import { UpdateDonorDto } from "../dto/update-donor.dto";


@Injectable()
export class DonorRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDonorDto: CreateDonorDto): Promise<DonorEntity> {
    return await this.prisma.donor.create({ data: createDonorDto })
  }

  async findAll(query: any): Promise<DonorEntity[]> {
    const _query: any = {}

    if (query.searchField && query.search) {
      _query.where = {
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive'
        }
      }
    }
    return await this.prisma.donor.findMany(_query)
  }

  async findById(id: string): Promise<DonorEntity> {
    return await this.prisma.donor.findFirst({ where: { id } })
  }

  async update(id: string, updateDonorDto: UpdateDonorDto): Promise<DonorEntity> {
    return await this.prisma.donor.update({ where: { id }, data: updateDonorDto })
  }

  async remove(id: string): Promise<DonorEntity> {
    return await this.prisma.donor.delete({ where: { id } })
  }
}