import { Module } from '@nestjs/common';
import { PeopleFamilyService } from './people-family.service';
import { PeopleFamilyController } from './people-family.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PeopleFamilyRepository } from './repositories/people-family.repository';

@Module({
  imports: [],
  providers: [PeopleFamilyService, PrismaService, PeopleFamilyRepository],
  controllers: [PeopleFamilyController],
})
export class PeopleFamilyModule { }
