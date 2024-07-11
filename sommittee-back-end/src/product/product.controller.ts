import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createProductDto: CreateProductDto) {
    return await this.service.create(createProductDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.service.findById(id)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.service.update(id, updateProductDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: string) {
    const product = await this.service.remove(id)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }
}