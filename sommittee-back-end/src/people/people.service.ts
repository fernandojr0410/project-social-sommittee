import { Injectable } from "@nestjs/common";
import { PeopleRepository } from "./repositories/people.repository";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";

@Injectable()
export class PeopleService {
  constructor(private readonly repository: PeopleRepository) { }

  async create(createPeopleDto: CreatePeopleDto) {
    return await this.repository.create(createPeopleDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  async update(id: string, updatePeopleDto: UpdatePeopleDto) {
    return await this.repository.update(id, updatePeopleDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}