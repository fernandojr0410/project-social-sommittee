import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    let generatedPassword = '';

    if (!createUserDto.password) {
      generatedPassword = this.passwordService.generateRandomPassword();
      createUserDto.password = generatedPassword;
    }

    const validationErrors = this.passwordService.validatePassword(
      createUserDto.password,
    );
    if (validationErrors.length) {
      throw new UnauthorizedException('Senha inválida');
    }

    createUserDto.password = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      ...newUser,
      plainPassword: generatedPassword,
    };
  }

  async findAll(query: any): Promise<UserEntity[]> {
    const _query: any = {
      where: {
        ...query,
      },
    };

    return await this.prisma.user.findMany(_query);
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findProfile(email: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async updateLastAction(userId: string, last_action: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { last_action },
    });
  }

  async findUserEmailPassword(email: string, password: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
