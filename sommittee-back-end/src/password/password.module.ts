import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PasswordRepository } from './repositories/password.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PasswordService, PasswordRepository, PrismaService],
  controllers: [PasswordController],
})
export class PasswordModule { }
