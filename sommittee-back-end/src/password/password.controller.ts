import {
  Controller,
  Patch,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { AuthGuard } from '../auth/auth.guard';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';

@Controller('password')
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Patch('generate/:id')
  async generatePasswordAndSendEmail(@Param('id') id: string) {
    const newPassword = this.passwordService.generateRandomPassword();
    await this.passwordService.updatePassword(id, { password: newPassword });

    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const emailSent = await this.emailService.sendPasswordByEmail(
      user.email,
      user.name,
      user.identifier,
      newPassword,
    );

    if (emailSent) {
      return { message: 'Senha atualizada com sucesso e enviada por email' };
    } else {
      return {
        message: 'Senha atualizada com sucesso, mas falha ao enviar por email',
      };
    }
  }
}
