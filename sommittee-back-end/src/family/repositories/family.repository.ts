import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FamilyEntity } from '../entities/family.entity';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { FamilyMemberDto } from '../dto/create-family.dto';
@Injectable()
export class FamilyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFamilyDto: FamilyMemberDto[]): Promise<any> {
    return await this.prisma.$transaction(async (prisma) => {
      const firstMember = createFamilyDto[0];

      const createdFamily = await prisma.family.create({
        data: {
          people: {
            connect: { id: firstMember.people_id },
          },
          address: {
            connect: { id: firstMember.address_id },
          },
        },
      });

      for (const member of createFamilyDto) {
        await prisma.people_Family.create({
          data: {
            people_id: member.people_id,
            family_id: createdFamily.id,
            function: member.people_family?.function,
          },
        });

        await prisma.address.update({
          where: { id: member.address_id },
          data: {
            zip_code: member.address?.zip_code,
            street: member.address?.street,
            number: member.address?.number,
            complement: member.address?.complement,
            neighborhood: member.address?.neighborhood,
            city: member.address?.city,
            state: member.address?.state,
          },
        });
      }

      const familyWithMembers = await prisma.family.findUnique({
        where: { id: createdFamily.id },
        include: {
          people_family: {
            include: {
              people: true,
            },
          },
          address: true,
        },
      });

      const familyResult = {
        id: familyWithMembers.id,
        created_at: familyWithMembers.created_at,
        updated_at: familyWithMembers.updated_at,
        address: familyWithMembers.address,
        members: familyWithMembers.people_family.map((pf) => ({
          people_id: pf.people.id,
          address_id: familyWithMembers.address.id,
          address: familyWithMembers.address,
          people: {
            name: pf.people.name,
            identifier: pf.people.identifier,
            email: pf.people.email,
            birth_date: pf.people.birth_date,
            gender: pf.people.gender,
            telephone: pf.people.telephone,
            education: pf.people.education,
            work: pf.people.work,
          },
          people_family: {
            function: pf.function,
          },
        })),
      };

      return familyResult;
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
        people_family: {
          select: {
            function: true,
            people: {
              select: {
                name: true,
                identifier: true,
                email: true,
                birth_date: true,
                gender: true,
                telephone: true,
                work: true,
                education: true,
              },
            },
          },
        },
      },
    };

    if (query.searchField && query.search) {
      _query.where = {
        people: {
          [query.searchField]: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      };
    }

    return await this.prisma.family.findMany(_query);
  }

  async findById(id: string): Promise<FamilyEntity | null> {
    return await this.prisma.family.findFirst({
      where: { id },
      include: {
        address: true,
        people_family: {
          include: {
            people: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateFamilyDto: Partial<UpdateFamilyDto>,
  ): Promise<FamilyEntity> {
    const { members } = updateFamilyDto;

    return await this.prisma.$transaction(async (prisma) => {
      const updatedFamily = await prisma.family.update({
        where: { id },
        data: {
          updated_at: new Date(),
        },
      });

      for (const member of members) {
        const { people_id, address_id, people_family } = member;

        await prisma.address.update({
          where: { id: address_id },
          data: {
            zip_code: member.address?.zip_code,
            street: member.address?.street,
            number: member.address?.number,
            complement: member.address?.complement,
            neighborhood: member.address?.neighborhood,
            city: member.address?.city,
            state: member.address?.state,
          },
        });

        await prisma.people_Family.updateMany({
          where: { family_id: id, people_id: people_id },
          data: {
            function: people_family?.function,
          },
        });
      }

      const familyWithMembers = await prisma.family.findUnique({
        where: { id: updatedFamily.id },
        include: {
          people_family: {
            include: {
              people: true,
            },
          },
          address: true,
        },
      });

      return {
        id: familyWithMembers.id,
        people_id: familyWithMembers.people_family[0]?.people.id,
        address_id: familyWithMembers.address.id,
        created_at: familyWithMembers.created_at,
        updated_at: familyWithMembers.updated_at,
        address: familyWithMembers.address,
        members: familyWithMembers.people_family.map((pf) => ({
          people_id: pf.people.id,
          address_id: familyWithMembers.address.id,
          address: familyWithMembers.address,
          people: {
            name: pf.people.name,
            identifier: pf.people.identifier,
            email: pf.people.email,
            birth_date: pf.people.birth_date,
            gender: pf.people.gender,
            telephone: pf.people.telephone,
            education: pf.people.education,
            work: pf.people.work,
          },
          people_family: {
            function: pf.function,
          },
        })),
      };
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
