import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdatePasswordDto } from "./dto/updatePassword-auth-dto";
import { AuthGuard } from "./auth.guard";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";


@Controller('users/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    console.log("user", req.user)
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Put('password')
  async updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.authService.updatePassword(req.user.id, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async changeProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.authService.changeProfile(req.user.id, updateUserDto)
    return updateUser
  }

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.user.id;
    await this.authService.logout(userId);
  }
} 