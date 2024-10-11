import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordService } from 'src/password/password.service';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly emailService: EmailService,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<any> {
  //   let generatedPassword = '';

  //   if (!createUserDto.password) {
  //     generatedPassword = this.passwordService.generateRandomPassword();
  //     createUserDto.password = generatedPassword;
  //   }

  //   const validationErrors = this.passwordService.validatePassword(
  //     createUserDto.password,
  //   );
  //   if (validationErrors.length) {
  //     throw new UnauthorizedException('Senha inválida');
  //   }

  //   createUserDto.password = await this.passwordService.hashPassword(
  //     createUserDto.password,
  //   );

  //   const newUser = await this.prisma.user.create({
  //     data: createUserDto,
  //   });

  //   return {
  //     ...newUser,
  //     plainPassword: generatedPassword,
  //   };
  // }
  // async create(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   console.log(`Senha recebida no repositório: ${createUserDto.password}`);

  //   if (!createUserDto.password) {
  //     throw new Error('A senha é necessária para criar o usuário.');
  //   }

  //   // Gera o hash da senha recebida
  //   const hashedPassword = await bcrypt.hash(
  //     createUserDto.password,
  //     await bcrypt.genSalt(),
  //   );

  //   const originalPassword = createUserDto.password;
  //   createUserDto.password = hashedPassword;

  //   const newUser = await this.prisma.user.create({
  //     data: createUserDto,
  //   });

  //   console.log(`Usuário criado: ${newUser.name}`);
  //   console.log(`Senha original: ${originalPassword}`);

  //   const templatePath = path.resolve(
  //     process.cwd(),
  //     'src',
  //     'email',
  //     'html',
  //     'NewUser.html',
  //   );

  //   const template = fs.readFileSync(templatePath, 'utf8');

  //   const htmlContent = template
  //     .replace('{{name}}', newUser.name)
  //     .replace('{{newPassword}}', originalPassword);

  //   try {
  //     await this.emailService.sendEmailUser(
  //       newUser.email,
  //       'Sua conta foi criada com sucesso!',
  //       htmlContent,
  //     );
  //     console.log('E-mail enviado com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao enviar o e-mail:', error);
  //   }

  //   return newUser;
  // }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log(`Senha recebida no repositório: ${createUserDto.password}`);

    if (!createUserDto.password) {
      throw new Error('A senha é necessária para criar o usuário.');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      await bcrypt.genSalt(),
    );

    const originalPassword = createUserDto.password;
    createUserDto.password = hashedPassword;

    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    console.log(`Usuário criado: ${newUser.name}`);
    console.log(`Senha original: ${originalPassword}`);

    return newUser;
  }

  async findAll(query: any): Promise<UserEntity[]> {
    const _query: any = {
      where: {
        ...query,
      },
    };

    return await this.prisma.user.findMany(_query);
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findProfile(email: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async updateLastAction(userId: string, last_action: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { last_action },
    });
  }

  async findUserEmailPassword(email: string, password: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
  }

  async incrementFailedAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        failed_attempts: {
          increment: 1,
        },
      },
    });
  }

  async resetFailedAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        failed_attempts: 0,
      },
    });
  }

  async lockAccount(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        account_locked: true,
      },
    });
  }

  async unlockAccount(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        account_locked: false,
        failed_attempts: 0,
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async verifyUserPassword(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  // async updateUserProfileAndPassword(
  //   user_id: string,
  //   email: string,
  //   name: string,
  //   password: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UserEntity> {
  //   console.log(`Senha recebida no repositório: ${password}`);

  //   const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: user_id },
  //     data: {
  //       password: hashedPassword,
  //       email: email,
  //       name: name,
  //       ...updateUserDto,
  //     },
  //   });

  //   console.log(`Usuário atualizado: ${updatedUser.name}`);
  //   console.log(`Nova senha: ${password}`);

  //   const templatePath = path.resolve(
  //     process.cwd(),
  //     'src',
  //     'email',
  //     'html',
  //     'NewPassword.html',
  //   );

  //   const template = fs.readFileSync(templatePath, 'utf8');

  //   const htmlContent = template
  //     .replace('{{name}}', name)
  //     .replace('{{newPassword}}', password);

  //   try {
  //     await this.emailService.sendEmailUser(
  //       email,
  //       'Sua senha foi alterada',
  //       htmlContent,
  //     );
  //     console.log('E-mail enviado com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao enviar o e-mail:', error);
  //   }

  //   return updatedUser;
  // }

  async updateUserProfileAndPassword(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const { password, ...restOfUpdates } = updateUserDto;

    let hashedPassword: string | undefined = undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Senha recebida no repositório:', password);
    } else {
      console.log('Nenhuma senha fornecida, mantendo a senha atual.');
    }

    const updateData = {
      ...restOfUpdates,
      ...(hashedPassword && { password: hashedPassword }),
    };

    console.log('Dados atualizados enviados para o banco:', updateData);

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
