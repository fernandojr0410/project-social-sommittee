import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdatePasswordDto } from './dto/updatePassword-auth.dto';
import { AuthGuard } from './auth.guard';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { LoginDto } from './dto/login-auth.dto';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { VerifyTwoFactorEmail } from './dto/verifyTwoFactorEmail.auth-dto';
import { SendSmsDto, VerifySmsDto } from './dto/verifyTwoFactorSms-auth.dto';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password, recaptchaToken } = loginDto;
    return this.authService.login(email, password, recaptchaToken);
  }

  @Post('verify-2fa')
  async verifyTwoFactor(@Body() verifyTwoFactorEmail: VerifyTwoFactorEmail) {
    const { code, user_id } = verifyTwoFactorEmail;
    return this.authService.verifyTwoFactorCode(code, user_id);
  }

  @Post('send-sms')
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    const { user_id } = sendSmsDto;
    return this.authService.sendSmsCode(user_id);
  }

  @Post('verify-sms')
  async verifySms(@Body() verifySmsDto: VerifySmsDto) {
    const { smsCode, user_id } = verifySmsDto;
    return this.authService.verifySmsCode(smsCode, user_id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const profile = await this.authService.getProfile(req.user.id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @UseGuards(AuthGuard)
  @Patch('password')
  async updatePassword(
    @Req() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(req.user.id, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async changeProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.changeProfile(req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('avatar')
  async updateAvatar(@Req() req, @Body('url') avatarUrl: string) {
    const userId = req.user.id;
    const updatedUser = await this.authService.updateAvatar(userId, avatarUrl);
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.user.id;
    return await this.authService.logout(userId);
  }
}
