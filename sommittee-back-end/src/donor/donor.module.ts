import { Module } from '@nestjs/common';
import { DonorService } from './donor.service';
import { DonorController } from './donor.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DonorRepository } from './repositories/donor.repository';

@Module({
  imports: [],
  providers: [DonorService, PrismaService, DonorRepository],
  controllers: [DonorController],
})
export class DonorModule { }
