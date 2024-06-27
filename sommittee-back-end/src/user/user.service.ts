import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from '../common/errors/types/notFoundError';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,

    private readonly logger: Logger,
  ) { }

  async updateLastAction(userId: string, lastAction: string) {
    return this.repository.updateLastAction(userId, lastAction);
  }

  async findAll() {
    const users = await this.repository.findAll();
    return users.map(e => {
      const { password, ...result } = e;
      return result;
    });
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    const { password, ...result } = user;
    return result
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.repository.update(id, updateUserDto);
  // }
  async update(id: string, updateUserDto: UpdateUserDto) {
    // if (updateUserDto.password) {
    //   const passwordValidationErrors = await validatePassword(updateUserDto.password);
    //   if (passwordValidationErrors.length > 0) {
    //     throw new Error
    //   }
    //   updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
    // }
    return this.repository.update(id, updateUserDto);
  }

  async generatorPassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash da senha usando bcrypt
    return this.repository.updatePassword(id, hashedPassword);
  }

  async remove(id: string) {
    return this.repository.remove(id);

  }

  async findProfile(email: string) {
    const userEmail = await this.repository.findProfile(email);
    if (!userEmail) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return userEmail;
  }
}
