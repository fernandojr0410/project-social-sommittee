import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { DonorService } from "./donor.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateDonorDto } from "./dto/create-donor.dto";
import { UpdateDonorDto } from "./dto/update-donor.dto";


@Controller('donor')
export class DonorController {
  constructor(private readonly service: DonorService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createDonorDto: CreateDonorDto) {
    return await this.service.create(createDonorDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findOne(id)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateData(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return await this.service.update(id, updateDonorDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: string) {
    return await this.service.remove(id)
  }
}