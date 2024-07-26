import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePeopleDto } from "../dto/create-people.dto";
import { PeopleEntity } from "../entities/people.entity";
import { UpdatePeopleDto } from "../dto/update-people.dto";

@Injectable()
export class PeopleRepository {
  constructor(private readonly prisma: PrismaService) { }

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


  async findAll(): Promise<PeopleEntity[]> {
    return await this.prisma.people.findMany({
      include: {
        address: true,
      }
    })
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
    console.log('Update Data:', updateData);
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
    return this.prisma.people.delete({
      where: { id }
    })
  }
}