import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { QueryProductDto } from "./dto/query-product.dto";
@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,

  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.repository.create(createProductDto);
  }

  async findAll(queryDto: QueryProductDto = {}) {
    return await this.repository.findAll(queryDto)
  }

  async findById(id: string) {
    return await this.repository.findById(id)
  }

  // async update(id: string, updateProductDto: UpdateProductDto) {
  //   const { donor_id, ...productData } = updateProductDto;

  //   return await this.repository.update(id, {
  //     ...productData,
  //     donor_id,
  //   });
  // }

  async update(id: string, updatedProductDTO: UpdateProductDto) {
    return await this.repository.update(id, updatedProductDTO)
  }


  async remove(id: string) {
    return await this.repository.remove(id)
  }
}