import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { AddressEntity } from "../entities/address.entity";
import { UpdateAddressDto } from "../dto/update-address.dto";


@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return await this.prisma.address.create({ data: createAddressDto })
  }

  async findAll(query: any): Promise<AddressEntity[]> {
    const _query: any = {};

    if (query.searchField && query.search) {
      _query.where = {
        ..._query.where,
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive',
        },
      };
    }
    return await this.prisma.address.findMany(_query)
  }

  async findById(id: string): Promise<AddressEntity> {
    return await this.prisma.address.findFirst({
      where: { id },
    })
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<AddressEntity> {
    return await this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: string): Promise<AddressEntity> {
    return await this.prisma.address.delete({
      where: { id }
    });
  }
}