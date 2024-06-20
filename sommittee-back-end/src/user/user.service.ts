import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'src/common/errors/types/notFoundError';
import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

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
    this.logger.log('Usou a rota FindOne - Filtrado apenas um usuário!', { count: user });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    return user;
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
