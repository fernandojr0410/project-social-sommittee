import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
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
  async createFamily(@Body() createFamilyDto: CreateFamilyDto) {
    if (!createFamilyDto.people_id) {
      throw new BadRequestException('Person ID must be provided');
    }

    return await this.familyService.create(createFamilyDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: QueryFamilyDto) {
    return await this.familyService.findAll(query);

  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const family = await this.familyService.findById(id);
    if (!family) {
      throw new NotFoundException('Family not found');
    }
    return family;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return await this.familyService.update(id, updateFamilyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const family = await this.familyService.remove(id);
    if (!family) {
      throw new NotFoundException('Family not found');
    }
    return family;
  }
}
