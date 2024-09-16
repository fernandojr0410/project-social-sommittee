import { Module } from '@nestjs/common';

import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { PrismaService } from '../prisma/prisma.service';
import { FamilyRepository } from './repositories/family.repository';

@Module({
  imports: [],
  providers: [FamilyService, PrismaService, FamilyRepository],
  controllers: [FamilyController],
})
export class FamilyModule { }
