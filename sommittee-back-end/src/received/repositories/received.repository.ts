import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReceivedDto } from '../dto/create-received.dto';
import { ReceivedEntity } from '../entities/received.entity';
import { Prisma, Type_donor } from '@prisma/client';
import { UpdateReceivedDto } from '../dto/update-received.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ReceivedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReceivedDto: CreateReceivedDto): Promise<ReceivedEntity> {
    const {
      date,
      description,
      user_id,
      donor_id,
      donor,
      condition_product,
      products,
    } = createReceivedDto;

    let donorId = donor_id;
    if (!donorId && donor) {
      const existingDonor = await this.prisma.donor.findUnique({
        where: { email: donor.email },
      });

      if (!existingDonor) {
        const newDonor = await this.prisma.donor.create({
          data: {
            name: donor.name,
            identifier: donor.identifier,
            email: donor.email,
            telephone: donor.telephone,
            type_donor: donor.type_donor,
          },
        });
        donorId = newDonor.id;
      } else {
        donorId = existingDonor.id;
      }
    }

    const received = await this.prisma.received.create({
      data: {
        date,
        description,
        condition_product,
        user_id,
        donor_id: donorId,
        products: {
          create: products.map((product) => ({
            product_id: product.product_id,
            amount: Number(product.amount),
          })),
        },
      },
      include: {
        donor: true,
        products: {
          include: {
            product: true,
          },
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
            amount: Number(product.amount),
          },
        });
      }
    }

    return received;
  }

  async findAll(query: any): Promise<ReceivedEntity[]> {
    const _query: any = {
      include: {
        products: {
          include: {
            product: true,
          },
        },
        donor: true,
        user: {
          select: {
            name: true,
            email: true,
            telephone: true,
          },
        },
      },
    };

    if (query.searchField && query.search) {
      if (query.searchField === 'name') {
        _query.where = {
          donor: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        };
      } else if (query.searchField === 'telephone') {
        _query.where = {
          donor: {
            telephone: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        };
      } else if (query.searchField === 'condition_product') {
        _query.where = {
          condition_product: query.search,
        };
      } else {
        _query.where = {
          [query.searchField]: {
            contains: query.search,
            mode: 'insensitive',
          },
        };
      }
    }

    return await this.prisma.received.findMany(_query);
  }

  async findById(id: string): Promise<ReceivedEntity> {
    const received = await this.prisma.received.findFirst({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        donor: true,

        user: {
          select: {
            name: true,
            email: true,
            telephone: true,
          },
        },
      },
    });

    return received;
  }

  async update(
    id: string,
    updateReceivedDto: UpdateReceivedDto,
  ): Promise<ReceivedEntity> {
    const { date, description, condition_product, donor, products } =
      updateReceivedDto;

    const updateData: Prisma.ReceivedUpdateInput = {
      date: date ? new Date(date).toISOString() : undefined,
      description,
      condition_product,
      donor: donor
        ? {
            update: {
              name: donor.name,
              identifier: donor.identifier,
              email: donor.email,
              telephone: donor.telephone,
              type_donor: donor.type_donor as Type_donor,
            },
          }
        : undefined,
    };

    const updatedReceived = await this.prisma.received.update({
      where: { id },
      data: updateData,
      include: {
        products: true,
        donor: true,
        user: true,
      },
    });

    if (products) {
      await this.prisma.receivedProduct.deleteMany({
        where: { received_id: id },
      });

      for (const p of products) {
        await this.prisma.receivedProduct.create({
          data: {
            received_id: id,
            product_id: p.product_id,
            amount: new Decimal(p.amount),
          },
        });

        const existingStock = await this.prisma.stock.findFirst({
          where: { product_id: p.product_id },
        });

        if (existingStock) {
          await this.prisma.stock.update({
            where: { id: existingStock.id },
            data: {
              amount: existingStock.amount.add(new Decimal(p.amount)),
            },
          });
        } else {
          await this.prisma.stock.create({
            data: {
              product_id: p.product_id,
              amount: new Decimal(p.amount),
            },
          });
        }
      }
    }

    return updatedReceived;
  }

  async remove(id: string): Promise<ReceivedEntity> {
    // Busca o recebimento e inclui os produtos relacionados
    const receivedItem = await this.prisma.received.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!receivedItem) {
      throw new Error('Received item not found');
    }

    await Promise.all(
      receivedItem.products.map(async (receivedProduct) => {
        const existingStock = await this.prisma.stock.findFirst({
          where: { product_id: receivedProduct.product_id },
        });

        if (existingStock) {
          const currentAmount = new Decimal(existingStock.amount);
          const decrementAmount = new Decimal(receivedProduct.amount);
          const newAmount = currentAmount.minus(decrementAmount);

          await this.prisma.stock.update({
            where: { id: existingStock.id },
            data: {
              amount: newAmount.greaterThan(new Decimal(0))
                ? newAmount
                : new Decimal(0),
            },
          });
        }
      }),
    );

    await this.prisma.receivedProduct.deleteMany({
      where: { received_id: id },
    });

    return await this.prisma.received.delete({ where: { id } });
  }
}
