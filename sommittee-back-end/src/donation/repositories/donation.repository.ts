import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDonationDto } from '../dto/create-donation.dto';
import { DonationEntity } from '../entities/donation.entity';
import { UpdateDonationDto } from '../dto/update-donation.dto';
import { Decimal } from '@prisma/client/runtime/library';
@Injectable()
export class DonationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // async create(
  //   createDonationDto: CreateDonationDto,
  //   donationProducts: { product_id: string; amount: number }[],
  // ) {
  //   return await this.prisma.$transaction(async (prisma) => {
  //     const donation = await prisma.donation.create({
  //       data: {
  //         description: createDonationDto.description,
  //         state: createDonationDto.state,
  //         observation: createDonationDto.observation,
  //         date_delivery: createDonationDto.date_delivery,
  //         donor: {
  //           connect: { id: createDonationDto.donor_id },
  //         },
  //         people: {
  //           connect: { id: createDonationDto.people_id },
  //         },
  //         family: {
  //           connect: { id: createDonationDto.family_id },
  //         },
  //       },
  //     });

  //     for (const product of donationProducts) {
  //       const stock = await prisma.stock.findFirst({
  //         where: { product_id: product.product_id },
  //       });

  //       if (!stock || stock.amount.lessThan(product.amount)) {
  //         throw new Error(
  //           `Estoque insuficiente para o produto com id ${product.product_id}`,
  //         );
  //       }

  //       await prisma.stock.update({
  //         where: { id: stock.id },
  //         data: { amount: stock.amount.sub(product.amount) },
  //       });

  //       await prisma.donationProducts.create({
  //         data: {
  //           donation_id: donation.id,
  //           product_id: product.product_id,
  //           amount: product.amount,
  //         },
  //       });
  //     }

  //     return donation;
  //   });
  // }
  // async create(
  //   createDonationDto: CreateDonationDto,
  //   donationProducts: { product_id: string; amount: number }[],
  // ) {
  //   return await this.prisma.$transaction(async (prisma) => {
  //     const personWithFamily = await prisma.people.findUnique({
  //       where: { id: createDonationDto.people_id },
  //       include: {
  //         People_Family: {
  //           select: { family_id: true },
  //         },
  //       },
  //     });

  //     if (!personWithFamily || personWithFamily.People_Family.length === 0) {
  //       throw new Error('Pessoa ou família não encontrada');
  //     }

  //     const familyId = personWithFamily.People_Family[0].family_id;

  //     const donation = await prisma.donation.create({
  //       data: {
  //         date_delivery: createDonationDto.date_delivery,
  //         state: createDonationDto.state,
  //         observation: createDonationDto.observation,
  //         donor: {
  //           connect: { id: createDonationDto.donor_id },
  //         },
  //         people: {
  //           connect: { id: createDonationDto.people_id },
  //         },
  //         family: {
  //           connect: { id: familyId },
  //         },
  //       },
  //       include: {
  //         donor: true,
  //         donation_products: {
  //           select: {
  //             product: {
  //               select: {
  //                 id: true,
  //                 name: true,
  //                 description: true,
  //                 type: true,
  //               },
  //             },
  //             amount: true,
  //           },
  //         },
  //         people: {
  //           include: {
  //             address: true,
  //           },
  //         },
  //         family: true,
  //       },
  //     });

  //     for (const product of donationProducts) {
  //       const stock = await prisma.stock.findFirst({
  //         where: { product_id: product.product_id },
  //       });

  //       if (!stock || stock.amount.toNumber() < product.amount) {
  //         throw new Error(
  //           `Estoque insuficiente para o produto com id ${product.product_id}`,
  //         );
  //       }

  //       await prisma.stock.update({
  //         where: { id: stock.id },
  //         data: {
  //           amount: new Decimal(stock.amount.toNumber() - product.amount),
  //         },
  //       });

  //       await prisma.donationProducts.create({
  //         data: {
  //           donation_id: donation.id,
  //           product_id: product.product_id,
  //           amount: product.amount,
  //         },
  //       });
  //     }

  //     return donation;
  //   });
  // }

  async create(
    createDonationDto: CreateDonationDto,
    donationProducts: { product_id: string; amount: number }[],
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      // Verificar se a pessoa tem a família associada
      const personFamily = await prisma.people_Family.findFirst({
        where: {
          people_id: createDonationDto.people_id,
          family_id: createDonationDto.family_id,
        },
      });

      // Debug: Verificar a relação entre pessoa e família
      console.log('Relação entre Pessoa e Família:', personFamily);

      if (!personFamily) {
        // Logar o ID da família que está sendo procurado
        console.log('ID da Família da Pessoa:', createDonationDto.family_id);
        throw new Error('Família não associada à pessoa');
      }

      // Criar a doação
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
            connect: { id: createDonationDto.family_id },
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
          family: true, // Inclui a família associada
        },
      });

      // Debug: Verificar a doação criada
      console.log('Doação Criada:', donation);

      // Atualizar o estoque para cada produto
      for (const product of donationProducts) {
        const stock = await prisma.stock.findFirst({
          where: { product_id: product.product_id },
        });

        // Debug: Verificar o estoque do produto
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
