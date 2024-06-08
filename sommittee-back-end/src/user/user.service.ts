import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'src/common/errors/types/notFoundError';

import { Logger } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly logger: Logger
  ) { }



  async updateLastAction(userId: string, lastAction: string) {
    return this.repository.updateLastAction(userId, lastAction);
  }

  async create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  async findAll() {
    const users = await this.repository.findAll();
    this.logger.log('Usou a rota FindAll - Filtrado todos usuários!', { count: users.length });
    return users.map(e => {
      const { password, ...result } = e;
      return result;
    });
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    this.logger.log('Usou a rota FindAll - Filtrado todos usuários!', { count: user });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.repository.remove(id);
  }


  async findProfile(email: string) {
    try {
      const userEmail = await this.repository.findProfile(email);
      if (!userEmail) {
        throw new NotFoundException('Usuário não encontrado!');
      }
      return userEmail;
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado!');
    }
  }
}
