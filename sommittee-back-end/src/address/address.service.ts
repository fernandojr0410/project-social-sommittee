import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repository/address.repository';
import { NotFoundError } from 'src/common/errors/types/notFoundError';

@Injectable()
export class AddressService {

  constructor(private readonly repository: AddressRepository) { }

  async create(createAddressDto: CreateAddressDto) {
    await this.repository.create(createAddressDto)
  }

  async findAll() {
    await this.repository.findAll()
  }

  async findOne(id: string) {
    const address = await this.repository.findOne(id)
    if (!address) {
      throw new NotFoundError(`Endereço não encontrado!`)
    }
    return address
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.repository.update(id, updateAddressDto);
  }

  async remove(id: string) {
    return await this.repository.remove(id)
  }
}
