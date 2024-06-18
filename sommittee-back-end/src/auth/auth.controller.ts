import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { UpdatePasswordDto } from "./dto/updatePassword-auth-dto";
import { AuthGuard } from "src/config/auth/auth.guard";
import { UpdateUserDto } from "src/user/dto/update-user.dto";


@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
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
} 