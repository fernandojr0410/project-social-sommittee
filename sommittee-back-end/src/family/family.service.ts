import { Injectable } from "@nestjs/common";
import { FamilyRepository } from "./repositories/family.repository";
import { CreateFamilyDto } from "./dto/create-family.dto";
import { UpdateFamilyDto } from "./dto/update-family.dto";
import { QueryFamilyDto } from "./dto/query-family.dto";


@Injectable()
export class FamilyService {
  constructor(private readonly repository: FamilyRepository) { }

  async create(createFamilyDto: CreateFamilyDto) {
    return await this.repository.create(createFamilyDto)
  }

  async findAll(queryDto: QueryFamilyDto = {}) {
    const query = {}
    if (queryDto.searchField && queryDto.search) {
      query[queryDto.searchField] = {
        mode: 'insensitive'
      }
    }
    return await this.repository.findAll(query)
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    return await this.repository.update(id, updateFamilyDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}