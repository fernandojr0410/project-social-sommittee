import { Injectable } from "@nestjs/common";
import { StockRepository } from './repositories/stock.repository';
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";


@Injectable()
export class StockService {
  constructor(private readonly repository: StockRepository) { }

  async create(createStockDto: CreateStockDto) {
    return await this.repository.create(createStockDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    return await this.repository.update(id, updateStockDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}