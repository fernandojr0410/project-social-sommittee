import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ReceivedService } from "./received.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateReceivedDto } from "./dto/create-received.dto";
import { UpdateReceivedDto } from "./dto/update-received.dto";


@Controller('received')
export class ReceivedController {
  constructor(private readonly service: ReceivedService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createReceivedDto: CreateReceivedDto) {
    return await this.service.create(createReceivedDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const received = await this.service.findById(id)
    if (!received) {
      throw new NotFoundException('Received not found')
    }
    return received
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updateReceivedDto: UpdateReceivedDto) {
    return await this.service.update(id, updateReceivedDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletedData(@Param('id') id: string) {
    const received = await this.service.remove(id)
    if (!received) {
      throw new NotFoundException('Received not found')
    }
    return received
  }

}