import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LogService } from './log.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly service: LogService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createLogDto: CreateLogDto) {
    return await this.service.create(createLogDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.service.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatedData(@Param('id') id: number, updateLogDto: UpdateLogDto) {
    return await this.service.update(id, updateLogDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: number) {
    return await this.service.remove(id);
  }
}
