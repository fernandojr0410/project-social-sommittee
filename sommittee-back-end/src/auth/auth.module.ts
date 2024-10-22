import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './jwtConstants';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repositories/user.repository';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { PasswordRepository } from '../password/repositories/password.repository';
import { UploadService } from 'src/photo/upload/photo-upload.service';
import { ReCaptchaService } from './recaptcha.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { SmsService } from './sms/sms.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    EmailModule,
    HttpModule,
  ],
  providers: [
    AuthService,
    UserRepository,
    PasswordService,
    PasswordRepository,
    AuthGuard,
    PrismaService,
    UserService,
    UploadService,
    ReCaptchaService,
    SmsService,
  ],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
