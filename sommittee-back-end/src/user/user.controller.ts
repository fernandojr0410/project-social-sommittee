import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/auth/auth.guard";



@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  // @Post('register')
  // async create(@Body() createUserDto: CreateUserDto) {
  //   const errors = this.passwordService.validatePassword(createUserDto.password);
  //   if (errors.length > 0) {
  //     throw new UnauthorizedException(`Senha inválida: ${errors.join(', ')}`);
  //   }

  //   const dataUser = await this.authService.createUserWithHashedPassword(createUserDto)
  //   return dataUser;
  // }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request) {
    const userEmail = request.user.email
    const user = await this.userService.findProfile(userEmail);
    await this.userService.updateLastAction(user.id, 'findAll');
    const dataUsers = await this.userService.findAll()
    return { userEmail, dataUsers };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() request) {
    const userEmail = request.user.email;
    const userProfile = await this.userService.findProfile(userEmail)

    if (!userProfile) {
      throw new UnauthorizedException("Usuário não encontrado!")
    }

    await this.userService.updateLastAction(userProfile.id, 'profile')

    return userProfile
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dataUser = await this.userService.findOne(id)
    await this.userService.updateLastAction(dataUser.id, 'findOne')
    return dataUser
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const dataUser = await this.userService.update(req.user.id, updateUserDto)
    await this.userService.updateLastAction(dataUser.id, 'update')
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