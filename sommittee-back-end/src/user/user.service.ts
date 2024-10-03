import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from '../common/errors/types/notFoundError';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  async updateLastAction(userId: string, lastAction: string) {
    return this.repository.updateLastAction(userId, lastAction);
  }

  async findAll(queryDto: QueryUserDto = {}) {
    const query = {};

    if (queryDto.searchField && queryDto.search) {
      query[queryDto.searchField] = {
        contains: queryDto.search,
        mode: 'insensitive',
      };
    }

    const users = await this.repository.findAll(query);

    return users.map((e) => {
      const { password, ...result } = e;
      return result;
    });
  }

  async findById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    const { password, ...result } = user;
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  async findProfile(email: string) {
    const userEmail = await this.repository.findProfile(email);
    if (!userEmail) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return userEmail;
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
