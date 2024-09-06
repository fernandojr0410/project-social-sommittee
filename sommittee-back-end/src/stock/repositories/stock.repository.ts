import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateStockDto } from "../dto/create-stock.dto";
import { StockEntity } from "../entities/stock.entity";
import { UpdateStockDto } from "../dto/update-stock.dto";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class StockRepository {
  constructor(private readonly prisma: PrismaService) { }



  async create(createStockDto: CreateStockDto): Promise<StockEntity> {
    const { amount, ...rest } = createStockDto;
    const decimalAmount = new Decimal(amount);

    return await this.prisma.stock.create({
      data: {
        ...rest,
        amount: decimalAmount,
      },
    });
  }

  async findAll(): Promise<StockEntity[]> {
    return await this.prisma.stock.findMany()
  }

  async findOne(id: string): Promise<StockEntity> {
    return await this.prisma.stock.findFirst({ where: { id } })
  }

  // async update(id: string, updateStockDto: UpdateStockDto): Promise<StockEntity> {
  //   return await this.prisma.stock.update({ where: { id }, data: updateStockDto })
  // }

  async update(id: string, updateStockDto: UpdateStockDto): Promise<StockEntity> {
    const { amount, ...rest } = updateStockDto;
    const decimalAmount = amount ? new Decimal(amount) : undefined;

    return await this.prisma.stock.update({
      where: { id },
      data: {
        ...rest,
        amount: decimalAmount,
      },
    });
  }

  async remove(id: string): Promise<StockEntity> {
    return await this.prisma.stock.delete({ where: { id } })
  }
}