import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)

  }
}
