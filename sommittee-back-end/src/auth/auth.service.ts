import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePasswordDto } from "./dto/updatePassword-auth-dto";
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from "src/user/dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  async loginUser(email: string, password: string) {}

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException('Usúario não encontrado!')
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })

    console.log("updatedUser", updatedUser)
    return updatedUser
  }
}
