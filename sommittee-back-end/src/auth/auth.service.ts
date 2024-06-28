import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePasswordDto } from "./dto/updatePassword-auth-dto";
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from "../../src/user/dto/update-user.dto";
import { UserRepository } from "../user/repositories/user.repository";
import { NotFoundError } from "../common/errors/types/notFoundError";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./jwtConstants";
import { CreateUserDto } from "../../src/user/dto/create-user.dto";
import { PasswordService } from '../password/password.service';
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger
  ) { }



  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt());
    createUserDto.password = hashedPassword
    const newUser = await this.userRepository.create(createUserDto);
    newUser.password = undefined // apaga a propriedade password do objeto
    return newUser
  }


  async getProfile(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado teste!');
    }
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha antiga incorreta!');
    }

    const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());

    await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        password: hashedPassword
      }
    });
  }

  async changeProfile(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException('Usúario não t!')
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
    return updatedUser
  }

  async createUserWithHashedPassword(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return user;
  }

  async verifyUserPassword(email: string, password: string) {
    const user = await this.userRepository.findProfile(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }

  async findUserEmailPassword(email: string, password: string) {
    const user = await this.userRepository.findProfile(email)
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!')
    }

    const userPassword = await bcrypt.compare(password, user.password)
    if (!userPassword) {
      throw new NotFoundError('Email ou senha incorretos!')
    }
    return user
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!')
    }
    const isPasswordValid = await this.verifyUserPassword(email, password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida!')
    }

    await this.userRepository.updateLastAction(user.id, 'login')
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



  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Credenciais Inválidas!');
    }

    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload, { secret: jwtConstants.secret });

    await this.prisma.token.create({
      data: {
        access_token: accessToken,
        user_id: user.id,
      },
    });

    return {
      access_token: accessToken,
    };
  }

  async logout(userId: string) {
    await this.prisma.token.updateMany({
      where: {
        user_id: userId,
        is_revoked: false,
      },
      data: {
        is_revoked: true,
      }
    });

    this.logger.log('info', {
      message: 'Usuário fez o logout',
      userId: userId,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
