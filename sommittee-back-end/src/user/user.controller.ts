import { Body, Controller, Delete, Get, Param, Patch, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request) {
    const userEmail = request.user.email
    const user = await this.userService.findProfile(userEmail);
    await this.userService.updateLastAction(user.id, 'findAll');
    const dataUsers = await this.userService.findAll()
    return { userEmail, dataUsers };
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // async getProfile(@Req() request) {
  //   const userEmail = request.user.email;
  //   const userProfile = await this.userService.findProfile(userEmail)

  //   if (!userProfile) {
  //     throw new UnauthorizedException("Usuário não encontrado!")
  //   }

  //   await this.userService.updateLastAction(userProfile.id, 'profile')

  //   return userProfile
  // }

  // @UseGuards(AuthGuard)
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   if (updateUserDto.password) {
  //     const newPassword = updateUserDto.password;
  //     const hashedPassword = await bcrypt.hash(newPassword, 10);
  //     await this.userService.generatorPassword(id, hashedPassword);

  //     return { message: 'Senha atualizada com sucesso' };
  //   } else {
  //     const dataUser = await this.userService.update(id, updateUserDto);
  //     await this.userService.updateLastAction(dataUser.id, 'update');
  //     return dataUser;
  //   }
  // }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dataUser = await this.userService.findOne(id)
    await this.userService.updateLastAction(dataUser.id, 'findOne')
    return dataUser
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataUser = await this.userService.remove(id)
    await this.userService.updateLastAction(dataUser.id, 'remove')
    return dataUser
  }
}