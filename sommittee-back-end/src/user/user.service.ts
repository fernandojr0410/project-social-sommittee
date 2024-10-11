import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from '../common/errors/types/notFoundError';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { PasswordService } from 'src/password/password.service';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    passwordService: PasswordService,
  ) {}

  async unlockUserAccount(userId: string): Promise<void> {
    await this.repository.unlockAccount(userId);
  }

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

  async updateUserProfileAndPassword(
    user_id: string,
    updateUserDto: UpdateUserDto,
  ) {
    console.log('Dados recebidos no serviço:', updateUserDto);

    const response = await this.repository.updateUserProfileAndPassword(
      user_id,
      updateUserDto,
    );

    console.log('Response no serviço:', response);
    return response;
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
