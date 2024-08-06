import { BadRequestException, Injectable } from "@nestjs/common";
import { FamilyRepository } from "./repositories/family.repository";
import { CreateFamilyDto } from "./dto/create-family.dto";
import { UpdateFamilyDto } from "./dto/update-family.dto";
import { QueryFamilyDto } from "./dto/query-family.dto";


@Injectable()
export class FamilyService {
  constructor(private readonly repository: FamilyRepository) { }

  async create(createFamilyDto: CreateFamilyDto) {
    if (!createFamilyDto.address_id || !createFamilyDto.people_id) {
      throw new BadRequestException('Both address_id and people_id must be provided');
    }
    return await this.repository.create(createFamilyDto);
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

  async findByid(id: string) {
    return await this.repository.findByid(id)
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    return await this.repository.update(id, updateFamilyDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}