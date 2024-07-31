import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { FamilyService } from "./family.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateFamilyDto } from "./dto/create-family.dto";
import { UpdateFamilyDto } from "./dto/update-family.dto";
import { QueryFamilyDto } from "./dto/query-family.dto";


@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createFamilyDto: CreateFamilyDto) {
    return await this.familyService.create(createFamilyDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Query() query: QueryFamilyDto) {
    return await this.familyService.findAll(query)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const family = await this.familyService.findOne(id)
    if (!family) {
      throw new NotFoundException('Family not found')
    }
    return family
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return await this.familyService.update(id, updateFamilyDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const family = await this.familyService.remove(id)
    if (!family) {
      throw new NotFoundException('Family not found')
    }
    return family
  }
}