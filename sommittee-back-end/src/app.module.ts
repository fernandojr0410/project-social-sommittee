import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { PasswordModule } from './password/password.module';
import { EmailModule } from './email/email.module';
import { PeopleModule } from './people/people.module';
import { FamilyModule } from './family/family.module';
import { PeopleFamilyModule } from './peopleFamily/people-family.module';
import { DonorModule } from './donor/donor.module';
import { DonationModule } from './donation/donation.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { LogModule } from './log/log.module';
import { LoggerMiddleware } from './log/middleware/logger.middleware';
import { AttachmentModule } from './attachment/attachment.module';
import { ReceivedModule } from './received/received.module';
import { CepService } from './cep/cep.service';
import { CepModule } from './cep/cep.module';
import { HttpModule } from '@nestjs/axios';
import { UploadModule } from './photo/upload/photo-upload.module';
import { SmsController } from './auth/sms/sms.controller';
import { SmsService } from './auth/sms/sms.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    AddressModule,
    PasswordModule,
    EmailModule,
    PeopleModule,
    FamilyModule,
    PeopleFamilyModule,
    DonorModule,
    DonationModule,
    ProductModule,
    StockModule,
    LogModule,
    AttachmentModule,
    ReceivedModule,
    HttpModule,
    CepModule,
    UploadModule,
  ],
  controllers: [AppController, SmsController],
  providers: [AppService, PrismaService, CepService, SmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
