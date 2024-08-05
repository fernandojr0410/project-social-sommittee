import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePeopleDto } from "../dto/create-people.dto";
import { PeopleEntity } from "../entities/people.entity";
import { UpdatePeopleDto } from "../dto/update-people.dto";

@Injectable()
export class PeopleRepository {
  constructor(private readonly prisma: PrismaService,
  ) { }

  async create(createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    const { address, ...peopleData } = createPeopleDto;

    const createdAddress = await this.prisma.address.create({
      data: address,
    });

    return await this.prisma.people.create({
      data: {
        ...peopleData,
        address: {
          connect: { id: createdAddress.id },
        },
      },
      include: { address: true },
    });
  }

  async findAll(query: any): Promise<PeopleEntity[]> {
    const _query: any = {
      where: {
        ...query,
      },
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
          }
        }
      }
    };

    return await this.prisma.people.findMany(_query)
  }

  async findById(id: string): Promise<PeopleEntity> {
    return await this.prisma.people.findFirst({
      where: { id },
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
          }
        }
      }
    })
  }

  async update(id: string, updatePeopleDto: UpdatePeopleDto): Promise<PeopleEntity> {
    const { address, ...rest } = updatePeopleDto

    const updateData: any = { ...rest }

    if (address) {
      updateData.address = {
        update: {
          ...address,
        }
      }
    }
    return await this.prisma.people.update({
      where: { id },
      data: updateData,
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
          }
        }
      }
    })

  }

  async remove(id: string): Promise<PeopleEntity> {
    const people = await this.prisma.people.findUnique({
      where: { id },
      include: {
        address: true,
        People_Family: true,
        families: true
      },
    });

    if (!people) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada.`);
    }

    try {
      await this.prisma.people_Family.deleteMany({
        where: { people_id: id },
      });
      await this.prisma.family.deleteMany({
        where: { people_id: id },
      });
      await this.prisma.people.delete({
        where: { id },
      });
      if (people.address) {
        const address = await this.prisma.address.findUnique({
          where: { id: people.address_id },
          include: {
            people: true,
          },
        });

        if (address && address.people.length === 0) {
          await this.prisma.address.delete({
            where: { id: people.address_id },
          });
        }
      }
      return people;
    } catch (error) {
      console.error('Erro ao remover pessoa:', error);
      throw new BadRequestException('Não foi possível remover a pessoa.');
    }
  }
}