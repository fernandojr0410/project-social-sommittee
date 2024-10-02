import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PasswordRepository } from './repositories/password.repository';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  imports: [],
  providers: [
    PasswordService,
    PasswordRepository,
    PrismaService,
    EmailService,
    UserService,
    UserRepository,
  ],
  controllers: [PasswordController],
  exports: [PasswordService],
})
export class PasswordModule {}
