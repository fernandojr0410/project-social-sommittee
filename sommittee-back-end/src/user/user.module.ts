import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { loggerProvider } from '../log/logger';
import { AuthModule } from 'src/config/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/config/auth/auth.service';
import { PasswordService } from './password.service';



@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    AuthModule,
    JwtService,
    AuthService,
    UserService,
    UserRepository,
    PrismaService,
    loggerProvider,
    PasswordService
  ],
})
export class UserModule { }
