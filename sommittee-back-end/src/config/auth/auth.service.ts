import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from '../../user/repositories/user.repository';
import { NotFoundError } from 'src/common/errors/types/notFoundError';
import { jwtConstants } from '../jwtConstants';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private logger: Logger,
  ) { }

  async createUserWithHashedPassword(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    this.logger.log('Usuário cadastrado!', user);
    return {
      message: `User ${user.name} created!`,
    };
  }

  async verifyUserPassword(email: string, password: string) {
    const user = await this.userRepository.findProfile(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }

  async findUserEmailPassword(email: string, password: string) {
    const user = await this.userRepository.findProfile(email);

    if (!user) {
      throw new NotFoundError('Usuario não encontrado!');
    }

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword) {
      throw new NotFoundError('Email ou senha incorretos!');
    }

    return user;
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    const isPasswordValid = await this.verifyUserPassword(email, password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida.');
    }

    await this.userRepository.updateLastAction(user.id, 'login');
    this.logger.log('info', {
      message: 'Usuário fez o login',
      userId: user.id,
      name: user.name,
      surname: user.surname,
    });

    const payload = { id: user.id, name: user.name, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    return { access_token: accessToken };
  }
}
