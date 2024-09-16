import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DonationRepository } from './repositories/donation.repository';

@Module({
  imports: [],
  providers: [DonationService, PrismaService, DonationRepository],
  controllers: [DonationController],
})
export class DonationModule { }
