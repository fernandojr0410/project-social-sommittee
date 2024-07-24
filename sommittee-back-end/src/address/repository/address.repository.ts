import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { AddressEntity } from "../entities/address.entity";
import { UpdateAddressDto } from "../dto/update-address.dto";


@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    const { user_id, ...addressData } = createAddressDto;

    if (!user_id) {
      throw new Error('User ID must be provided');
    }

    return this.prisma.address.create({
      data: {
        ...addressData,
        user: {
          connect: { id: user_id },
        },
      },
      include: { user: true },
    });
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.prisma.address.findMany({
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            email: true
          }
        },
        people: true,
      }
    })
  }

  async findById(id: string): Promise<AddressEntity> {
    return await this.prisma.address.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            email: true
          },
        },
        people: true,
      }
    })
  }

  async filter(filters: any): Promise<AddressEntity[]> {

    return await this.prisma.address.findMany({
      where: {
        ...filters,
      },
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            email: true
          }
        }
      }
    });
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