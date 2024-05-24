import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UnauthorizedError } from "src/common/errors/types/unauthorizedError";
import { AuthGuard } from "src/config/auth/auth.guard";


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const dataUser = await this.userService.createUserWithHashedPassword(createUserDto)
    return dataUser
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const dataUser = await this.userService.findAll()
    return dataUser
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dataUser = await this.userService.findOne(id)
    return dataUser
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const dataUser = await this.userService.update(id, updateUserDto)
    return dataUser
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataUser = await this.userService.remove(id)
    return dataUser
  }

  @Post('login')
  async loginUser(@Body() body: any) {
    try {
      await this.userService.findUserEmailPassword(body.email, body.password)
      const accessToken = await this.userService.signIn(body.email, body.password)
      return accessToken
    } catch (error) {
      console.error(error)
      throw new UnauthorizedError("Email ou senha não encontrado! Verifique suas credenciais e tente novamente.")
    }
  }

}