import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordModule } from 'src/password/password.module';

@Module({
  imports: [PasswordModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PrismaService,

  ],
})
export class UserModule { }
