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
import { User } from '@prisma/client';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
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
  ): Promise<{
    two_factor: boolean;
    user_id?: string;
    accountLocked?: boolean;
  }> {
    await this.recaptchaService.verifyToken(recaptchaToken, 'login');

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    if (user.account_locked) {
      return { two_factor: false, accountLocked: true };
    }

    const isPasswordValid = await this.userRepository.verifyUserPassword(
      email,
      password,
    );

    if (!isPasswordValid) {
      await this.userRepository.incrementFailedAttempts(user.id);

      const updatedUser = await this.userRepository.findUserByEmail(email);

      if (updatedUser.failed_attempts >= 3) {
        await this.userRepository.lockAccount(user.id);
        throw new NotFoundException(
          'Conta bloqueada. Entre em contato com o administrador.',
        );
      }

      throw new NotFoundException('Credenciais inválidas!');
    }

    await this.userRepository.resetFailedAttempts(user.id);

    await this.generateTwoFactorCode(user.email, user.name, user.id);

    return { two_factor: true, user_id: user.id }; // Retorna true para 2FA
  }

  // async generateTwoFactorCode(
  //   email: string,
  //   name: string,
  //   user_id: string,
  // ): Promise<string> {
  //   const secret = speakeasy.generateSecret({ name: 'YourAppName' });
  //   await this.prisma.user.update({
  //     where: { id: user_id },
  //     data: {
  //       two_factor_secret: secret.base32,
  //       is_two_factor_enabled: true,
  //     },
  //   });

  //   const code = speakeasy.totp({
  //     secret: secret.base32,
  //     encoding: 'base32',
  //     step: 300,
  //   });

  //   const templatePath = path.resolve(
  //     process.cwd(),
  //     'src',
  //     'email',
  //     'html',
  //     '2FA.html',
  //   );
  //   const template = fs.readFileSync(templatePath, 'utf8');
  //   const htmlContent = template
  //     .replace('{{name}}', name)
  //     .replace('{{code}}', code);

  //   await this.emailService.sendEmailUser(
  //     email,
  //     'Seu código de verificação 2FA',
  //     htmlContent,
  //   );

  //   return code;
  // }
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

    console.log(`Código de autenticação 2FA para ${email}: ${code}`);

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
      expiresIn: '5d',
      secret: Buffer.from(process.env.JWT_SECRET, 'base64').toString(),
      algorithm: 'HS256',
    });

    await this.prisma.token.create({
      data: {
        access_token: accessToken,
        user_id: user_id,
      },
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
    console.log(user);
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

  async verifyUserPassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

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
        failed_attempts: true,
        account_locked: true,
        avatar_url: true,
      },
    });
  }
  async createUserWithHashedPassword(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return user;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    const isPasswordValid = await this.verifyUserPassword(email, password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida!');
    }

    await this.userRepository.updateLastAction(user.id, 'login');
    const payload = { id: user.id, name: user.name, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    return { access_token: accessToken };
  }

  async logout(userId: string) {
    await this.prisma.token.updateMany({
      where: {
        user_id: userId,
        is_revoked: false,
      },
      data: {
        is_revoked: true,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async updateAvatar(
    userId: string,
    avatarUrl: string,
  ): Promise<Partial<User>> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { avatar_url: avatarUrl },
      select: {
        name: true,
        identifier: true,
        email: true,
        telephone: true,
        role: true,
        avatar_url: true,
        created_at: true,
        updated_at: true,
        last_action: true,
      },
    });
    return updatedUser;
  }
}
