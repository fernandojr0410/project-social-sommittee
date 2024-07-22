import { Controller, Get, Post, Body, UseGuards, Put, Req, Param, Delete, Patch, NotFoundException, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

import { AuthGuard } from '../auth/auth.guard';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @UseGuards(AuthGuard)
  @Get('filter')
  async filter(
    @Query('category') category?: string,
    @Query('search') search?: string
  ) {
    if (!category || !search) {
      throw new Error('Missing category or search parameter');
    }
    const addresses = await this.addressService.filter(category, search);
    return addresses;
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.addressService.findAll()
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
