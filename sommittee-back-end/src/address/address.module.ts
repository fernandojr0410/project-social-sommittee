import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './repository/address.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, PrismaService],
  exports: []
})
export class AddressModule { }
