import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReceivedDto } from "../dto/create-received.dto";
import { ReceivedEntity } from "../entities/received.entity";
import { Prisma, Type_donor } from "@prisma/client";
import { UpdateReceivedDto } from "../dto/update-received.dto";
import { Decimal } from "@prisma/client/runtime/library";
@Injectable()
export class ReceivedRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createReceivedDto: CreateReceivedDto): Promise<ReceivedEntity> {
    const { date, description, user_id, donor_id, condition_product, products } = createReceivedDto;

    const received = await this.prisma.received.create({
      data: {
        date,
        description,
        condition_product,
        user_id,
        donor_id,
        products: {
          create: products.map(product => ({
            product_id: product.product_id,
            amount: product.amount,
          })),
        },
      },
    });


    for (const product of products) {

      const existingStock = await this.prisma.stock.findFirst({
        where: { product_id: product.product_id },
      });

      if (existingStock) {

        await this.prisma.stock.update({
          where: { id: existingStock.id },
          data: {
            amount: existingStock.amount.add(product.amount),
          },
        });
      } else {

        await this.prisma.stock.create({
          data: {
            product_id: product.product_id,
            amount: product.amount,
          },
        });
      }
    }

    return received;
  }

  async findAll(): Promise<ReceivedEntity[]> {
    return await this.prisma.received.findMany({
      include: {
        products: true,
        donor: true,
        user: true,
      },
    });
  }

  async findById(id: string): Promise<ReceivedEntity> {
    const received = await this.prisma.received.findFirst({
      where: { id },
      include: {
        products: true,
        user: true,
        donor: true,
      },
    });

    if (!received) {
      throw new NotFoundException(`Received record with ID ${id} not found`);
    }

    return received;
  }


  async update(id: string, updateReceivedDto: UpdateReceivedDto): Promise<ReceivedEntity> {
    const { date, description, condition_product, donor, products } = updateReceivedDto;

    const updateData: Prisma.ReceivedUpdateInput = {
      date: date ? new Date(date).toISOString() : undefined,
      description,
      condition_product,
      donor: donor ? {
        update: {
          name: donor.name,
          identifier: donor.identifier,
          email: donor.email,
          telephone: donor.telephone,
          type_donor: donor.type_donor as Type_donor,
        },
      } : undefined,
    };


    const updatedReceived = await this.prisma.received.update({
      where: { id: id },
      data: updateData,
    });


    if (products) {
      for (const p of products) {
        const existingStock = await this.prisma.stock.findFirst({
          where: { product_id: p.product_id },
        });

        if (existingStock) {
          await this.prisma.stock.update({
            where: { id: existingStock.id },
            data: {
              amount: new Decimal(p.amount),
            },
          });
        } else {
          await this.prisma.stock.create({
            data: {
              product_id: p.product_id,
              amount: p.amount,
            },
          });
        }
      }
    }

    return updatedReceived;
  }

  async remove(id: string): Promise<ReceivedEntity> {

    const receivedItem = await this.prisma.received.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!receivedItem) {
      throw new Error('Item not found');
    }


    await Promise.all(
      receivedItem.products.map(async (product) => {
        await this.prisma.stock.update({
          where: { id: product.product_id },
          data: {
            amount: {
              decrement: product.amount,
            },
          },
        });
      })
    );


    return await this.prisma.received.delete({ where: { id } });
  }
}