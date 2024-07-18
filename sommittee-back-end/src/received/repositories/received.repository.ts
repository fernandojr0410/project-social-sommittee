import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReceivedDto } from "../dto/create-received.dto";
import { ReceivedEntity } from "../entities/received.entity";
import { UpdateReceivedDto } from "../dto/update-received.dto";
@Injectable()
export class ReceivedRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createReceivedDto: CreateReceivedDto): Promise<ReceivedEntity> {
    return await this.prisma.received.create({ data: createReceivedDto })
  }

  async findAll(): Promise<ReceivedEntity[]> {
    return await this.prisma.received.findMany()
  }

  async findById(id: string): Promise<ReceivedEntity> {
    return await this.prisma.received.findFirst({
      where: { id },
      include: {
        address: {
          select: {
            zip_code: true,
            street: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: true,
            state: true,
          },
        },
        user: {
          select: {
            name: true,
            surname: true,
            email: true,
          },
        },
        product: {
          select: {
            name: true,
            description: true,
            type: true,
          },
        },
        donor: {
          select: {
            name: true,
            surname: true,
            email: true,
            contact: true,
            type_donor: true,
          },
        },
        stock: {
          select: {
            amount: true,
          },
        },
      },
    });
  }

  async update(id: string, updateReceivedDto: UpdateReceivedDto): Promise<ReceivedEntity> {
    const { address, product, stock, ...rest } = updateReceivedDto;

    const updateData: any = { ...rest };

    if (address) {
      updateData.address = {
        update: {
          ...address,
        },
      }
      if (product) {
        updateData.product = {
          update: {
            ...product
          }
        }
      }
      if (stock) {
        updateData.stock = {
          update: {
            ...stock
          }
        }
      }
    }

    return await this.prisma.received.update({
      where: { id },
      data: updateData,
      include: {
        address: true,
        user: true,
        product: true,
        donor: true,
        stock: true,
      },
    });
  }

  async remove(id: string): Promise<ReceivedEntity> {
    return await this.prisma.received.delete({ where: { id } })
  }
}