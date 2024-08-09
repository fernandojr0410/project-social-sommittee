import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateFamilyDto } from "../dto/create-family.dto";
import { FamilyEntity } from "../entities/family.entity";
import { UpdateFamilyDto } from "../dto/update-family.dto";

@Injectable()
export class FamilyRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFamilyDto: CreateFamilyDto): Promise<FamilyEntity> {
    const { address_id, people_id, function: peopleFunction } = createFamilyDto;

    return await this.prisma.$transaction(async (prisma) => {

      const createdFamily = await prisma.family.create({
        data: {
          address: {
            connect: { id: address_id },
          },
          people: {
            connect: { id: people_id },
          },
        },
        include: {
          address: true,
          people: true,
        },
      });

      if (peopleFunction) {
        await prisma.people_Family.create({
          data: {
            people_id: people_id,
            family_id: createdFamily.id,
            function: peopleFunction,
          },
        });
      }

      return createdFamily;
    });
  }

  async findAll(query: any): Promise<FamilyEntity[]> {
    const _query: any = {
      include: {
        address: {
          select: { 
            zip_code: true,
            street: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: true,
            state: true,
          },
        },
        people: {
          select: {
            name: true,
            cpf: true,
          },
        },
        people_family: {
          select: {
            function: true,
          },
        },
      },
    };

    console.log('query.searchField:', query.searchField);
    console.log('query.search:', query.search);

    if (query.searchField && query.search) {
      _query.where = {
        people: {
          some: {
            [query.searchField]: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      };
    }

    console.log('Query being sent to findAll:', _query);

    const results = await this.prisma.family.findMany(_query);

    console.log('Resultados encontrados:', results);

    return results;
  }







  async findById(id: string): Promise<FamilyEntity | null> {
    return await this.prisma.family.findFirst({
      where: { id },
      include: {
        address: true,
        people: true,
        people_family: true,
      },
    });
  }

  async update(id: string, updateFamilyDto: Partial<UpdateFamilyDto>): Promise<FamilyEntity> {
    const { people_id, address_id, function: familyFunction } = updateFamilyDto;

    const updatedFamily = await this.prisma.family.update({
      where: { id },
      data: {
        address: {
          connect: { id: address_id },
        },
        people: {
          connect: { id: people_id },
        },
      },
      include: {
        address: true,
        people: true,
        people_family: true,
      },
    });

    await this.prisma.people_Family.update({
      where: {
        id: updatedFamily.people_family[0].id,
      },
      data: {
        function: familyFunction,
      },
    });

    return this.prisma.family.findUnique({
      where: { id },
      include: {
        address: true,
        people: true,
        people_family: true,
      },
    });
  }

  async remove(id: string): Promise<FamilyEntity> {
    const family = await this.prisma.family.findUnique({
      where: { id },
      include: {
        people_family: true,
      },
    });

    if (!family) {
      throw new NotFoundException('Family not found');
    }

    await this.prisma.people_Family.deleteMany({
      where: {
        family_id: id,
      },
    });

    await this.prisma.family.delete({
      where: { id },
    });

    return family;
  }
}
