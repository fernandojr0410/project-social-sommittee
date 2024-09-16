import { Injectable } from "@nestjs/common";
import { PeopleRepository } from "./repositories/people.repository";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";
import { NotFoundError } from "../common/errors/types/notFoundError";
import { QueryPeopleDto } from "./dto/query-people.dto";

@Injectable()
export class PeopleService {
  constructor(private readonly repository: PeopleRepository) { }

  async create(createPeopleDto: CreatePeopleDto) {
    return await this.repository.create(createPeopleDto)
  }

  async findAll(queryDto: QueryPeopleDto = {}) {
    const query = {}

    if (queryDto.searchField && queryDto.search) {
      query[queryDto.searchField] = {
        contains: queryDto.search,
        mode: 'insensitive'
      };
    }
    return await this.repository.findAll(query)
  }


  async findById(id: string) {
    const people = await this.repository.findById(id)
    if (!people) {
      throw new NotFoundError(`Pessoa não encontrada!`)
    }
    return people
  }

  async update(id: string, updatePeopleDto: UpdatePeopleDto) {
    const existingPeople = await this.repository.findById(id)
    if (!existingPeople) {
      throw new Error(`Pessoa com id ${id} não contrado`)
    }
    return await this.repository.update(id, updatePeopleDto)
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}