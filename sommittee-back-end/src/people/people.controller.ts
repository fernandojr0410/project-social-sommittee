import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createPeopleDto: CreatePeopleDto) {
    return await this.peopleService.create(createPeopleDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return await this.peopleService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const people = await this.peopleService.findById(id)
    if (!people) {
      throw new NotFoundException('People not found')
    }
    return people
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.peopleService.update(id, updateUserDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const people = await this.peopleService.remove(id)
    if (!people) {
      throw new NotFoundException('People not found')
    }
    return people
  }
}