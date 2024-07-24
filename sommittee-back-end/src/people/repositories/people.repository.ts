import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePeopleDto } from "../dto/create-people.dto";
import { PeopleEntity } from "../entities/people.entity";
import { UpdatePeopleDto } from "../dto/update-people.dto";

@Injectable()
export class PeopleRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    return await this.prisma.people.create({ data: createPeopleDto })
  }

  async findAll(): Promise<PeopleEntity[]> {
    return await this.prisma.people.findMany({
      include: {
        address: {
          select: {
            zip_code: true,
            street: true,
            number: true,
            neighborhood: true,
            complement: true,
            city: true,
            state: true,

          }
        }
      }
    })
  }

  async findById(id: string): Promise<PeopleEntity> {
    return await this.prisma.people.findFirst({
      where: { id }
    })
  }

  async update(id: string, updatePeopleDto: UpdatePeopleDto): Promise<PeopleEntity> {
    return this.prisma.people.update({
      where: { id },
      data: updatePeopleDto
    })
  }

  async remove(id: string): Promise<PeopleEntity> {
    return this.prisma.people.delete({
      where: { id }
    })
  }
}