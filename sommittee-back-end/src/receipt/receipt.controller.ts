import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ReceiptService } from "./receipt.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateReceiptDto } from "./dto/create-receipt.dto";
import { UpdateReceiptDto } from "./dto/update-receipt.dto";


@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createReceiptDto: CreateReceiptDto) {
    return await this.receiptService.create(createReceiptDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.receiptService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const receipt = await this.receiptService.findById(id)
    if (!receipt) {
      throw new NotFoundException('Receipt not found')
    }
    return receipt
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
    return await this.receiptService.update(id, updateReceiptDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: string) {
    const receipt = await this.receiptService.remove(id)
    if (!receipt) {
      throw new NotFoundException('Receipt not found')
    }
    return receipt
  }
}