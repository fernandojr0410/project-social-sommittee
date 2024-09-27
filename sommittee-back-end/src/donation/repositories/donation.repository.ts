import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDonationDto } from '../dto/create-donation.dto';
import { DonationEntity } from '../entities/donation.entity';
import { UpdateDonationDto } from '../dto/update-donation.dto';
import { Decimal } from '@prisma/client/runtime/library';
@Injectable()
export class DonationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDonationDto: CreateDonationDto,
    donationProducts: { product_id: string; amount: number }[],
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const personFamily = await prisma.people_Family.findFirst({
        where: {
          people_id: createDonationDto.people_id,
        },
      });

      console.log('Relação entre Pessoa e Família:', personFamily);

      if (!personFamily) {
        throw new Error('Família não associada à pessoa');
      }

      const donation = await prisma.donation.create({
        data: {
          date_delivery: createDonationDto.date_delivery,
          state: createDonationDto.state,
          observation: createDonationDto.observation,
          donor: {
            connect: { id: createDonationDto.donor_id },
          },
          people: {
            connect: { id: createDonationDto.people_id },
          },
          family: {
            connect: { id: personFamily.family_id },
          },
          donation_products: {
            create: donationProducts.map((product) => ({
              product: {
                connect: { id: product.product_id },
              },
              amount: product.amount,
            })),
          },
        },
        include: {
          donor: true,
          donation_products: {
            select: {
              product: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  type: true,
                },
              },
              amount: true,
            },
          },
          people: {
            include: {
              address: true,
            },
          },
          family: true,
        },
      });

      console.log('Doação Criada:', donation);

      for (const product of donationProducts) {
        const stock = await prisma.stock.findFirst({
          where: { product_id: product.product_id },
        });

        console.log('Estoque do Produto:', stock);

        if (!stock || stock.amount.toNumber() < product.amount) {
          throw new Error(
            `Estoque insuficiente para o produto com id ${product.product_id}`,
          );
        }

        await prisma.stock.update({
          where: { id: stock.id },
          data: {
            amount: new Decimal(stock.amount.toNumber() - product.amount),
          },
        });
      }

      return donation;
    });
  }

  async findLatestDonations(): Promise<DonationEntity[]> {
    return await this.prisma.donation.findMany({
      orderBy: {
        date_delivery: 'desc',
      },
      take: 5,
      include: {
        donor: true,
        donation_products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
              },
            },
            amount: true,
          },
        },
        people: {
          include: {
            address: true,
          },
        },
        family: true,
      },
    });
  }

  async findAll(query: any): Promise<DonationEntity[]> {
    const _query: any = {
      include: {
        donor: true,
        donation_products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
              },
            },
            amount: true,
          },
        },
        people: {
          include: {
            address: true,
          },
        },
        family: true,
      },
    };

    if (query.searchField && query.search) {
      if (query.searchField === 'name') {
        _query.where = {
          people: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        };
      } else if (query.searchField === 'telephone') {
        _query.where = {
          people: {
            telephone: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        };
      } else if (query.searchField === 'state') {
        _query.where = {
          state: query.search,
        };
      } else if (query.searchField === 'date_delivery') {
        _query.where = {
          date_delivery: query.search,
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

    return await this.prisma.donation.findMany(_query);
  }

  async findById(id: string): Promise<DonationEntity | null> {
    return await this.prisma.donation.findUnique({
      where: { id },
      include: {
        donor: true,
        donation_products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
              },
            },
            amount: true,
          },
        },
        people: {
          include: {
            address: true,
          },
        },
        family: true,
      },
    });
  }

  async update(
    id: string,
    updateDonationDto: UpdateDonationDto,
    updatedDonationProducts?: { product_id: string; amount: number }[],
  ): Promise<DonationEntity> {
    return await this.prisma.$transaction(async (prisma) => {
      const existingDonation = await prisma.donation.findUnique({
        where: { id },
        include: {
          donation_products: true,
        },
      });

      if (!existingDonation) {
        throw new Error('Doação não encontrada');
      }

      const updateData: any = {
        ...(updateDonationDto.date_delivery && {
          date_delivery: updateDonationDto.date_delivery,
        }),
        ...(updateDonationDto.state && { state: updateDonationDto.state }),
        ...(updateDonationDto.observation && {
          observation: updateDonationDto.observation,
        }),
        ...(updateDonationDto.donor_id && {
          donor: { connect: { id: updateDonationDto.donor_id } },
        }),
        ...(updateDonationDto.people_id && {
          people: { connect: { id: updateDonationDto.people_id } },
        }),
      };

      const donation = await prisma.donation.update({
        where: { id },
        data: updateData,
      });

      const existingProductsMap = new Map<string, { amount: number }>();
      existingDonation.donation_products.forEach((product) => {
        existingProductsMap.set(product.product_id, {
          amount: product.amount.toNumber(),
        });
      });

      for (const oldProduct of existingDonation.donation_products) {
        const newProductData = updatedDonationProducts?.find(
          (product) => product.product_id === oldProduct.product_id,
        );

        if (newProductData) {
          const stock = await prisma.stock.findFirst({
            where: { product_id: oldProduct.product_id },
          });

          if (!stock) {
            throw new Error(
              `Estoque não encontrado para o produto com id ${oldProduct.product_id}`,
            );
          }

          await prisma.stock.update({
            where: { id: stock.id },
            data: {
              amount: stock.amount.plus(new Decimal(oldProduct.amount)),
            },
          });

          await prisma.stock.update({
            where: { id: stock.id },
            data: {
              amount: stock.amount.minus(new Decimal(newProductData.amount)),
            },
          });

          await prisma.donationProducts.update({
            where: {
              id: oldProduct.id,
            },
            data: {
              amount: newProductData.amount,
            },
          });
        } else {
          const stock = await prisma.stock.findFirst({
            where: { product_id: oldProduct.product_id },
          });

          if (stock) {
            await prisma.stock.update({
              where: { id: stock.id },
              data: {
                amount: stock.amount.plus(
                  new Decimal(oldProduct.amount.toString()),
                ),
              },
            });
          }

          await prisma.donationProducts.deleteMany({
            where: {
              donation_id: donation.id,
              product_id: oldProduct.product_id,
            },
          });
        }
      }

      if (updatedDonationProducts) {
        for (const newProduct of updatedDonationProducts) {
          const existingProduct = existingProductsMap.get(
            newProduct.product_id,
          );

          if (!existingProduct) {
            const stock = await prisma.stock.findFirst({
              where: { product_id: newProduct.product_id },
            });

            if (!stock || stock.amount.toNumber() < newProduct.amount) {
              throw new Error(
                `Estoque insuficiente para o produto com id ${newProduct.product_id}`,
              );
            }

            await prisma.stock.update({
              where: { id: stock.id },
              data: {
                amount: stock.amount.minus(new Decimal(newProduct.amount)),
              },
            });
          }
        }
      }
      return donation;
    });
  }

  async remove(id: string): Promise<DonationEntity> {
    return await this.prisma.donation.delete({ where: { id } });
  }
}
