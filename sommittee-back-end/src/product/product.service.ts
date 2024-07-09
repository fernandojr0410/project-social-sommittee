import { HttpException, Injectable } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,

  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.repository.create(createProductDto);
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.repository.update(id, updateProductDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}