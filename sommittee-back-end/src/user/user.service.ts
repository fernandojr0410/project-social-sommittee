import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundError } from "src/common/errors/types/notFoundError";
import * as bcryptjs from "bcryptjs"

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository, private readonly jwtService: JwtService) { }

  async createUserWithHashedPassword(createUserDto: CreateUserDto) {
    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
    const user = await this.repository.create({ ...createUserDto, password: hashedPassword });
    return {
      message: `User ${user.name} created!`
    };
  }

  async verifyUserPassword(email: string, password: string) {
    const user = await this.repository.findProfile(email);
    if (!user) {
      return false;
    }
    return await bcryptjs.compare(password, user.password);
  }


  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.findUserEmailPassword(email, password);

    await this.repository.updateLastAction(user.id, 'login');
    const payload = { id: user.id, name: user.name, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async updateLastAction(userId: string, lastAction: string) {
    return this.repository.updateLastAction(userId, lastAction);
  }

  async create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  async findAll() {
    const users = await this.repository.findAll();
    return users.map(e => {
      const { password, ...result } = e
      return result
    })
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.repository.remove(id);
  }

  async findUserEmailPassword(email: string, password: string) {
    const user = await this.repository.findProfile(email)

    if (!user) {
      throw new NotFoundError("Usuario não encontrado!")
    }

    const userPassword = await bcryptjs.compare(password, user.password)

    if (!userPassword) {
      throw new NotFoundError("Email ou senha incorretos!")
    }

    return user
  }

  async findProfile(email: string) {
    try {
      const userEmail = await this.repository.findProfile(email);
      if (!userEmail) {
        throw new NotFoundException("Usuário não encontrado!");
      }
      return userEmail;
    } catch (error) {
      throw new NotFoundException("Usuário não encontrado!");
    }

  }
}
