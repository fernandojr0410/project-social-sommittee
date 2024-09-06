import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReceivedDto } from "../dto/create-received.dto";
import { ReceivedEntity } from "../entities/received.entity";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class ReceivedRepository {
  constructor(private readonly prisma: PrismaService) { }

  // async create(createReceivedDto: CreateReceivedDto): Promise<ReceivedEntity> {
  //   const { date, description, product_id, donor_id, stock_id, user_id, condition_product } = createReceivedDto;

  //   const stock = await this.prisma.stock.findUnique({ where: { id: stock_id } });
  //   if (!stock) {
  //     throw new NotFoundException('Stock not found');
  //   }

  //   const existingProduct = await this.prisma.product.findUnique({ where: { id: product_id } });
  //   if (!existingProduct) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   const existingDonor = await this.prisma.donor.findUnique({ where: { id: donor_id } });
  //   if (!existingDonor) {
  //     throw new NotFoundException('Donor not found');
  //   }

  //   const createdReceived = await this.prisma.received.create({
  //     data: {
  //       date,
  //       condition_product,
  //       description,
  //       product: { connect: { id: product_id } },
  //       donor: { connect: { id: donor_id } },
  //       stock: { connect: { id: stock_id } },
  //       user: { connect: { id: user_id } },
  //     },
  //   });

  //   await this.prisma.stock.update({
  //     where: { id: stock_id },
  //     data: {
  //       amount: stock.amount.plus(new Decimal(0))
  //     },
  //   });

  //   return createdReceived;
  // }
  async create(createReceivedDto: CreateReceivedDto): Promise<ReceivedEntity> {
    const { date, description, product_id, donor_id, stock_id, user_id, condition_product, product, donor } = createReceivedDto;

    // Verificar se o estoque, produto e doador existem
    const stock = await this.prisma.stock.findUnique({ where: { id: stock_id } });
    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    const existingProduct = await this.prisma.product.findUnique({ where: { id: product_id } });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const existingDonor = await this.prisma.donor.findUnique({ where: { id: donor_id } });
    if (!existingDonor) {
      throw new NotFoundException('Donor not found');
    }

    // Atualizar o estoque com a quantidade do produto recebido
    const totalProductAmount = product.reduce((acc, p) => acc + p.amount, 0);

    await this.prisma.stock.update({
      where: { id: stock_id },
      data: {
        amount: stock.amount.plus(new Decimal(totalProductAmount)),
      },
    });

    // Criar o recebimento
    const createdReceived = await this.prisma.received.create({
      data: {
        date,
        condition_product,
        description,
        product: { connect: { id: product_id } },
        donor: { connect: { id: donor_id } },
        stock: { connect: { id: stock_id } },
        user: { connect: { id: user_id } },
      },
    });

    return createdReceived;
  }



  async findAll(): Promise<ReceivedEntity[]> {
    return await this.prisma.received.findMany({
      include: {
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
            cpf: true,
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

  async findById(id: string): Promise<ReceivedEntity> {
    return await this.prisma.received.findFirst({
      where: { id },
      include: {
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


  async remove(id: string): Promise<ReceivedEntity> {
    return await this.prisma.received.delete({ where: { id } })
  }
}