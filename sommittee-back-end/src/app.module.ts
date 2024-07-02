import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { PasswordModule } from './password/password.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, AddressModule, PasswordModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }