import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdatePasswordDto } from "./dto/updatePassword-auth-dto";
import { AuthGuard } from "./auth.guard";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";


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
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('password')
  async updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.authService.updatePassword(req.user.id, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
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