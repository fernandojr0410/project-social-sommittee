import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { EmailService } from '../email/email.service';
import * as speakeasy from 'speakeasy';
import * as fs from 'fs';
import * as path from 'path';
import { UpdatePasswordDto } from './dto/updatePassword-auth-dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ReCaptchaService } from './recaptcha.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly recaptchaService: ReCaptchaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      await bcrypt.genSalt(),
    );
    createUserDto.password = hashedPassword;
    const newUser = await this.userRepository.create(createUserDto);
    newUser.password = undefined;
    return newUser;
  }

  async login(
    email: string,
    password: string,
    recaptchaToken: string,
  ): Promise<{ two_factor: boolean; user_id?: string }> {
    await this.recaptchaService.verifyToken(recaptchaToken, 'login');
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const isPasswordValid = await this.verifyUserPassword(email, password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida!');
    }

    await this.generateTwoFactorCode(user.email, user.name, user.id);
    return { two_factor: true, user_id: user.id };
  }

  async generateTwoFactorCode(
    email: string,
    name: string,
    user_id: string,
  ): Promise<string> {
    const secret = speakeasy.generateSecret({ name: 'YourAppName' });
    await this.prisma.user.update({
      where: { id: user_id },
      data: {
        two_factor_secret: secret.base32,
        is_two_factor_enabled: true,
      },
    });

    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      step: 300,
    });

    const templatePath = path.resolve(
      process.cwd(),
      'src',
      'email',
      'html',
      '2FA.html',
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const htmlContent = template
      .replace('{{name}}', name)
      .replace('{{code}}', code);

    await this.emailService.sendEmailUser(
      email,
      'Seu código de verificação 2FA',
      htmlContent,
    );

    return code;
  }

  async verifyTwoFactorCode(
    code: string,
    user_id: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
      select: { two_factor_secret: true, email: true, name: true },
    });

    if (!user || !user.two_factor_secret) {
      throw new UnauthorizedException('Usuário ou segredo 2FA não encontrado.');
    }

    const verified = speakeasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: 'base32',
      token: code,
      window: 1,
      step: 300,
    });

    if (!verified) {
      throw new UnauthorizedException('Código 2FA inválido.');
    }

    const payload = { id: user_id, email: user.email, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    return { access_token: accessToken };
  }

  async getProfile(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
      select: {
        name: true,
        identifier: true,
        email: true,
        telephone: true,
        avatar_url: true,
        role: true,
        created_at: true,
        updated_at: true,
        last_action: true,
      },
    });
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha antiga incorreta!');
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      await bcrypt.genSalt(),
    );
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  // Método adicionado: Verificar senha
  async verifyUserPassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  // Método adicionado: Atualizar perfil
  async changeProfile(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        name: true,
        identifier: true,
        email: true,
        telephone: true,
        role: true,
        avatar_url: true,
      },
    });
  }
}
