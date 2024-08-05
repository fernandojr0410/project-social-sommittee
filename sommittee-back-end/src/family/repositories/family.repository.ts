import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateFamilyDto } from "../dto/create-family.dto";
import { FamilyEntity } from "../entities/family.entity";
import { UpdateFamilyDto } from "../dto/update-family.dto";

@Injectable()
export class FamilyRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFamilyDto: CreateFamilyDto): Promise<FamilyEntity> {
    const { address_id, people_id, function: familyFunction } = createFamilyDto;

    const createdFamily = await this.prisma.family.create({
      data: {
        address: {
          connect: { id: address_id },
        },
        people: {
          connect: { id: people_id },
        },
      },
      include: { address: true, people: true },
    });

    await this.prisma.people_Family.create({
      data: {
        function: familyFunction,
        people_id,
        family_id: createdFamily.id,
      },
    });

    return createdFamily;
  }

  async findAll(query: any): Promise<FamilyEntity[]> {
    const _query: any = {
      where: {
        ...query
      },
      include: {
        address: true,
        people: true,
        people_family: true,
      },
    }

    if (query.searchField && query.search) {
      _query.where = {
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive',
        }
      };
    }

    return await this.prisma.family.findMany(_query)
  }


  async findOne(id: string): Promise<FamilyEntity> {
    return await this.prisma.family.findFirst(
      {
        where: { id }
      })
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto): Promise<FamilyEntity> {
    return await this.prisma.family.update(
      {
        where: { id },
        data: updateFamilyDto
      })
  }

  async remove(id: string): Promise<FamilyEntity> {
    return await this.prisma.family.delete(
      {
        where: { id }
      })
  }
}