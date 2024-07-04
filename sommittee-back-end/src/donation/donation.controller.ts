import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { DonationService } from "./donation.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { AuthGuard } from "../auth/auth.guard";
import { UpdateDonationDto } from "./dto/update-donation.dto";


@Controller('donation')
export class DonationController {
  constructor(private readonly service: DonationService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createDonationDto: CreateDonationDto) {
    return await this.service.create(createDonationDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return await this.service.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateData(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
    return await this.service.update(id, updateDonationDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: string) {
    return await this.service.remove(id)
  }
}