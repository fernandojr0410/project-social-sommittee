import { Injectable } from '@nestjs/common';
import { LogRepository } from './repositories/log.repository';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogService {
  constructor(private readonly repository: LogRepository) {}

  async create(createLogDto: CreateLogDto) {
    return await this.repository.create(createLogDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: number) {
    return await this.repository.findById(id);
  }

  async update(id: number, updateLogDto: UpdateLogDto) {
    return await this.repository.update(id, updateLogDto);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
