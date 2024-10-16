import { BadRequestException, Injectable } from '@nestjs/common';
import { FamilyRepository } from './repositories/family.repository';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { QueryFamilyDto } from './dto/query-family.dto';

@Injectable()
export class FamilyService {
  constructor(private readonly repository: FamilyRepository) {}

  async create(createFamilyDto: CreateFamilyDto) {
    if (!createFamilyDto.members || !createFamilyDto.members.length) {
      throw new BadRequestException(
        'At least one family member must be provided',
      );
    }

    const familyEntity = await this.repository.create(createFamilyDto.members);

    return familyEntity;
  }

  async findAll(queryDto: QueryFamilyDto = {}) {
    return await this.repository.findAll(queryDto);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    if (!updateFamilyDto.members || !updateFamilyDto.members.length) {
      throw new BadRequestException(
        'At least one family member must be provided',
      );
    }

    return await this.repository.update(id, updateFamilyDto);
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
