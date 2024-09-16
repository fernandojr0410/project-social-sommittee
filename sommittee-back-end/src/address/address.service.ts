import { Inject, Injectable, } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repository/address.repository';
import { NotFoundError } from '../common/errors/types/notFoundError';
import { QueryAddressDto } from './dto/query-address.dto';
@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) { }

  async create(createAddressDto: CreateAddressDto) {
    return this.repository.create(createAddressDto)
  }

  async findAll(queryDto: QueryAddressDto = {}) {
    return await this.repository.findAll(queryDto)
  }

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
