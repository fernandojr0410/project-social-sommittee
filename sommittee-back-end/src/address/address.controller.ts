import { Controller, Get, Post, Body, UseGuards, Put, Req, Param, Delete, Patch, NotFoundException, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

import { AuthGuard } from '../auth/auth.guard';
import { UpdateAddressDto } from './dto/update-address.dto';
import { QueryAddressDto } from './dto/query-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }


  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressService.create(createAddressDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: QueryAddressDto) {
    return await this.addressService.findAll(query)
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const address = await this.addressService.findById(id)
    if (!address) {
      throw new NotFoundException('Address not found')
    }
    return address
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressService.update(id, updateAddressDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const address = await this.addressService.remove(id)
    if (!address) {
      throw new NotFoundException('Address not found')
    }
    return address
  }
}
