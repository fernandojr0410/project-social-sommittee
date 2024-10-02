import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PasswordRepository } from './repositories/password.repository';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
  constructor(private readonly passwordRepository: PasswordRepository) {}

  validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres.');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula.');
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push('A senha deve conter pelo menos um caracter especial.');
    }

    if (!/\d/.test(password)) {
      errors.push('A senha deve conter pelo menos um dígito (número).');
    }

    return errors;
  }

  generateRandomPassword(): string {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '@#$%^&*';
    const allChars =
      upperCaseChars + lowerCaseChars + numberChars + specialChars;

    let password = '';

    password += upperCaseChars.charAt(
      Math.floor(Math.random() * upperCaseChars.length),
    );
    password += lowerCaseChars.charAt(
      Math.floor(Math.random() * lowerCaseChars.length),
    );
    password += numberChars.charAt(
      Math.floor(Math.random() * numberChars.length),
    );
    password += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length),
    );

    for (let i = password.length; i < 12; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

    return password;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const hashedPassword = await this.hashPassword(updatePasswordDto.password);
    return this.passwordRepository.updatePassword(userId, hashedPassword);
  }
}
