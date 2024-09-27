import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { ProductDashboardDto } from './dto/dashboard-product.dto';
@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.repository.create(createProductDto);
  }

  async findAll(queryDto: QueryProductDto = {}) {
    return await this.repository.findAll(queryDto);
  }

  async getDashboardData(): Promise<any> {
    const products = await this.repository.findAllWithStock();

    const productMap = products.reduce((acc, product) => {
      const totalAmount = product.stocks.reduce((sum, stock) => {
        return sum + parseInt(stock.amount);
      }, 0);

      if (acc[product.type]) {
        acc[product.type].totalAmount += totalAmount;
      } else {
        acc[product.type] = {
          type: product.type,
          totalAmount: totalAmount,
        };
      }

      return acc;
    }, {});

    return Object.values(productMap);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, updatedProductDTO: UpdateProductDto) {
    return await this.repository.update(id, updatedProductDTO);
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
