import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PeopleFamilyService } from "./people-family.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreatePeopleFamilyDto } from "./dto/create-people-family.dto";
import { UpdatePeopleFamilyDto } from "./dto/update-people-family.dto";


@Controller('PeopleFamily')
export class PeopleFamilyController {
  constructor(private readonly service: PeopleFamilyService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createPeopleFamilyDto: CreatePeopleFamilyDto) {
    return await this.service.create(createPeopleFamilyDto)
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
  async updatedData(@Param('id') id: string, updatePeopleFamilyDto: UpdatePeopleFamilyDto) {
    return await this.service.update(id, updatePeopleFamilyDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.remove(id)
  }
}