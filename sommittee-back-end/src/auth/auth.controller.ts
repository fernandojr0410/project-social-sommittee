import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Req, UseGuards, UseInterceptors, UploadedFile, Res, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdatePasswordDto } from "./dto/updatePassword-auth-dto";
import { AuthGuard } from "./auth.guard";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from "multer";
import { extname } from "path";


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
    const profile = await this.authService.getProfile(req.user.id);
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
    return profile
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
    if (!updateUser) {
      throw new NotFoundException('Profile not found')
    }
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
    return await this.authService.logout(userId);
  }
  // @UseGuards(AuthGuard)
  // @Post('profile/avatar')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads/avatars',
  //     filename: (req, file, callback) => {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //       callback(null, uniqueSuffix + extname(file.originalname));
  //     }
  //   })
  // }))
  // async uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
  //   console.log('Arquivo recebido:', file);

  //   if (!file) {
  //     throw new BadRequestException('File not uploaded');
  //   }

  //   console.log('Tipo do arquivo:', file.mimetype);
  //   console.log('Tamanho do arquivo:', file.size);
  //   console.log('Caminho do arquivo:', file.path);

  //   const avatarPath = `/uploads/avatars/${file.filename}`;
  //   console.log('Caminho do avatar:', avatarPath);

  //   try {
  //     await this.authService.updateAvatar(req.user.id, avatarPath);
  //   } catch (error) {
  //     console.error('Erro ao atualizar o avatar:', error);
  //     throw new InternalServerErrorException('Error updating avatar');
  //   }

  //   return { avatar: avatarPath };
  // }



} 