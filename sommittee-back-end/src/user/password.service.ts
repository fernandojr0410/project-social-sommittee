import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordService {
  validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Pelo menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Pelo menos uma letra maiúscula');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Pelo menos uma letra minúscula');
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push('Pelo menos um caracter especial');
    }

    if (!/\d/.test(password)) {
      errors.push('Pelo menos um dígito (número)');
    }

    return errors;
  }
}
