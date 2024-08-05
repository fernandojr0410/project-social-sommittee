import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PeopleFamilyService } from "./people-family.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreatePeopleFamilyDto } from "./dto/create-people-family.dto";
import { UpdatePeopleFamilyDto } from "./dto/update-people-family.dto";


@Controller('peopleFamily')
export class PeopleFamilyController {
  constructor(private readonly service: PeopleFamilyService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createPeopleFamilyDto: CreatePeopleFamilyDto) {
    console.log('Creating PeopleFamily with:', createPeopleFamilyDto);
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
    const peopleFamily = await this.service.findById(id)
    if (!peopleFamily) {
      throw new NotFoundException('PeopleFamily not found')
    }
    return peopleFamily
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updatePeopleFamilyDto: UpdatePeopleFamilyDto) {
    return await this.service.update(id, updatePeopleFamilyDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const peopleFamily = await this.service.remove(id)
    if (!peopleFamily) {
      throw new NotFoundException('PeopleFamily not found')
    }
    return { message: 'PeopleFamily successfully deleted' };

  }
}