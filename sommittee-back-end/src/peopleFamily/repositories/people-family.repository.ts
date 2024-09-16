import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePeopleFamilyDto } from "../dto/create-people-family.dto";
import { PeopleFamilyEntity } from "../entities/people-family.entity";
import { UpdatePeopleFamilyDto } from "../dto/update-people-family.dto";

@Injectable()
export class PeopleFamilyRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPeopleFamilyDto: CreatePeopleFamilyDto): Promise<PeopleFamilyEntity> {
    return await this.prisma.people_Family.create({
      data: {
        people_id: createPeopleFamilyDto.people_id,
        family_id: createPeopleFamilyDto.family_id,
        function: createPeopleFamilyDto.function,
      }
    });
  }

  async findAll(): Promise<PeopleFamilyEntity[]> {
    return await this.prisma.people_Family.findMany()
  }

  async findById(id: string): Promise<PeopleFamilyEntity> {
    return await this.prisma.people_Family.findUnique({ where: { id } });
  }

  async update(id: string, updatePeopleFamilyDto: UpdatePeopleFamilyDto): Promise<PeopleFamilyEntity> {
    return await this.prisma.people_Family.update({
      where: { id },
      data: {
        ...updatePeopleFamilyDto
      }
    });
  }
  async remove(id: string): Promise<PeopleFamilyEntity> {
    return await this.prisma.people_Family.delete({ where: { id } })
  }
}