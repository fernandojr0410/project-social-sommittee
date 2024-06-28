import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './jwtConstants';
import { PassportModule } from "@nestjs/passport";
import { AuthGuard } from './auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repositories/user.repository';
import { PasswordService } from '../password/password.service';
import { LoggerProvider } from '../log/logger';
import { UserService } from '../user/user.service';
import { PasswordRepository } from '../password/repositories/password.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }
    }),
    UserModule
  ],
  providers: [AuthService, UserRepository, PasswordService, PasswordRepository, LoggerProvider, AuthGuard, PrismaService, UserService],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule { }
