import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { StockService } from "./stock.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";


@Controller('stock')
export class StockController {
  constructor(private readonly service: StockService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createStockDto: CreateStockDto) {
    return await this.service.create(createStockDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const stock = await this.service.findOne(id)
    if (!stock) {
      throw new NotFoundException('Stock not found')
    }
    return stock
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return await this.service.update(id, updateStockDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: string) {
    const stock = await this.service.remove(id)
    if (!stock) {
      throw new NotFoundException('Stock not found')
    }
    return stock
  }
}