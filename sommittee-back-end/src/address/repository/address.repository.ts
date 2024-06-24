import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { AddressEntity } from "../entities/address.entity";
import { UpdateAddressDto } from "../dto/update-address.dto";


@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return await this.prisma.address.create({
      data: createAddressDto
    });
  }


  async findAll(): Promise<AddressEntity[]> {
    return await this.prisma.address.findMany()
  }

  async findOne(id: string): Promise<AddressEntity> {
    return await this.prisma.address.findFirst({
      where: {
        id,
      }
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
      where: {
        id
      }
    })
  }
}