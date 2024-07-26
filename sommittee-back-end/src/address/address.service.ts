import { Inject, Injectable, } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repository/address.repository';
import { NotFoundError } from '../common/errors/types/notFoundError';
@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) { }

  async create(createAddressDto: CreateAddressDto) {
    return this.repository.create(createAddressDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  // async filter(category: string, search: string) {
  //   const filters = {
  //     [category]: {
  //       contains: search,
  //       mode: 'insensitive'
  //     }
  //   };

  //   console.log('Service filters:', filters);

  //   return this.repository.filter(filters);
  // }

  async findById(id: string) {
    const address = await this.repository.findById(id)
    if (!address) {
      throw new NotFoundError(`Endereço não encontrado!`)
    }
    return address
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const existingAddress = await this.repository.findById(id);
    if (!existingAddress) {
      throw new Error(`Endereço com ID ${id} não encontrado.`);
    }
    return await this.repository.update(id, updateAddressDto);
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}
