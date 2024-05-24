import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedInterception } from "src/common/errors/interceptors/unauthorized.interceptor";
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
    const user = await this.repository.findByEmail(email);
    if (!user) {
      return false;
    }
    return await bcryptjs.compare(password, user.password);
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.repository.findByEmail(email);
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      throw new UnauthorizedInterception();
    }
    const payload = { id: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
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
    const user = await this.repository.findByEmail(email)
    if (!user) {
      throw new NotFoundError("Usuario não encontrado!")
    }
    const userPassword = await bcryptjs.compare(password, user.password)
    if (!userPassword) {
      throw new NotFoundError("Email ou senha incorretos!")
    }
    return user
  }
}
