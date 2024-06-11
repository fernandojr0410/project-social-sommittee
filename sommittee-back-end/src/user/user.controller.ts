import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UnauthorizedError } from "src/common/errors/types/unauthorizedError";
import { AuthGuard } from "src/config/auth/auth.guard";
import { AuthService } from "src/config/auth/auth.service";
import { PasswordService } from "./password.service";



@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) { }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const errors = this.passwordService.validatePassword(createUserDto.password);
    if (errors.length > 0) {
      throw new UnauthorizedException(`Senha inválida: ${errors.join(', ')}`);
    }

    const dataUser = await this.authService.createUserWithHashedPassword(createUserDto)
    return dataUser;
  }

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
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const dataUser = await this.userService.update(id, updateUserDto)
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

  @Post('login')
  async loginUser(@Body() body: any) {
    try {
      const accessToken = await this.authService.signIn(body.email, body.password)
      return accessToken
    } catch (error) {
      console.error(error)
      throw new UnauthorizedError("Email ou senha não encontrado! Verifique suas credenciais e tente novamente.")
    }
  }
}