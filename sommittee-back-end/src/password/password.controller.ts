// src/password/password.controller.ts
import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  @UseGuards(AuthGuard)
  @Patch('generate/:id')
  async generatorPassword(@Param('id') id: string) {
    const newPassword = this.passwordService.generateRandomPassword();
    await this.passwordService.updatePassword(id, { password: newPassword });

    return { message: 'Senha atualizada com sucesso', generatedPassword: newPassword };
  }
}
