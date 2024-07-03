import { Injectable } from "@nestjs/common";
import { PeopleFamilyRepository } from "./repositories/people-family.repository";
import { CreatePeopleFamilyDto } from "./dto/create-people-family.dto";
import { UpdatePeopleFamilyDto } from "./dto/update-people-family.dto";


@Injectable()
export class PeopleFamilyService {
  constructor(private readonly repository: PeopleFamilyRepository) { }

  async create(createPeopleFamilyDto: CreatePeopleFamilyDto) {
    return await this.repository.create(createPeopleFamilyDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  async update(id: string, updatePeopleFamilyDto: UpdatePeopleFamilyDto) {
    return await this.repository.update(id, updatePeopleFamilyDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}