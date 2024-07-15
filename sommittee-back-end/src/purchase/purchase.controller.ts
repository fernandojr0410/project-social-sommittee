import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { UpdatePurchaseDto } from "./dto/update-purchase.dto";


@Controller('purchase')
export class PurchaseController {
  constructor(private readonly service: PurchaseService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createPurchaseDto: CreatePurchaseDto) {
    return await this.service.create(createPurchaseDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const purchase = await this.service.findById(id)
    if (!purchase) {
      throw new NotFoundException('Purchase not found')
    }
    return purchase
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return await this.service.update(id, updatePurchaseDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async deletedData(@Param('id') id: string) {
    const purchase = await this.service.remove(id)
    if (!purchase) {
      throw new NotFoundException('Purchase not found')
    }
    return purchase
  }
}