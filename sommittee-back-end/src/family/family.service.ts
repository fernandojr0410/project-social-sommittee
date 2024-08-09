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
    const query = {};
    if (queryDto.searchField && queryDto.search) {
      query[queryDto.searchField] = {
        contains: queryDto.search,
        mode: 'insensitive',
      };
    }
    return await this.repository.findAll(query);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    const { function: familyFunction, people_id, address_id } = updateFamilyDto;

    if (!people_id || !address_id) {
      throw new BadRequestException('Both people_id and address_id are required');
    }

    return await this.repository.update(id, {
      people_id,
      address_id,
      function: familyFunction,
    });
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
