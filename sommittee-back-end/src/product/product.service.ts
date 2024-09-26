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

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, updatedProductDTO: UpdateProductDto) {
    return await this.repository.update(id, updatedProductDTO);
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }

  async getDashboardData(type: string): Promise<any> {
    const products = await this.repository.findAllWithStock();

    // Filtra os produtos pelo tipo e soma os estoques
    const filteredProducts = products.filter(
      (product) => product.type === type,
    );

    const totalAmount = filteredProducts.reduce((total, product) => {
      const productStock = product.stocks.reduce((sum, stock) => {
        return sum + stock.amount.toNumber();
      }, 0);
      return total + productStock;
    }, 0);

    return {
      type: type,
      totalAmount: totalAmount,
    };
  }
}
