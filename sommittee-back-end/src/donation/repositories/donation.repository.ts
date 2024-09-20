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

        await prisma.donationProducts.create({
          data: {
            donation_id: donation.id,
            product_id: product.product_id,
            amount: product.amount,
          },
        });
      }

      return donation;
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
      _query.where = {
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive',
        },
      };
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
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
              },
            },
          },
        },
        people: true,
        family: true,
      },
    });
  }

  // async update(
  //   id: string,
  //   updateDonationDto: UpdateDonationDto,
  // ): Promise<DonationEntity> {
  //   return await this.prisma.donation.update({
  //     where: { id },
  //     data: updateDonationDto,
  //   });
  // }

  async remove(id: string): Promise<DonationEntity> {
    return await this.prisma.donation.delete({ where: { id } });
  }
}
