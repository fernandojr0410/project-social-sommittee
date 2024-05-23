import { Injectable } from "@nestjs/common";

import { NotFoundError } from "src/common/errors/types/notFoundError";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) { }

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto)
  }

  findAll() {
    return this.repository.findAll()
  }

  async findOne(id: number): Promise<UserEntity> {
    const client = await this.repository.findOne(id)

    if (!client) {
      throw new NotFoundError('Usuário não encontrado!')
    }
    return client
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.repository.remove(id)
  }
}