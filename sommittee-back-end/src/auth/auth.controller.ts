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
import { UpdatePasswordDto } from './dto/updatePassword-auth-dto';
import { AuthGuard } from './auth.guard';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { VerifyTwoFactorDto } from './dto/VerifyTwoFactorDto.auth.dto';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password, recaptchaToken } = loginDto;
    return this.authService.login(email, password, recaptchaToken);
  }

  @Post('verify-2fa')
  async verifyTwoFactor(@Body() verifyTwoFactorDto: VerifyTwoFactorDto) {
    const { code, user_id } = verifyTwoFactorDto;
    return this.authService.verifyTwoFactorCode(code, user_id);
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
}
