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
import { PurchaseModule } from './purchase/purchase.module';
import { ReceivedModule } from './received/received.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, AddressModule, PasswordModule, EmailModule, PeopleModule, FamilyModule, PeopleFamilyModule, DonorModule, DonationModule, ProductModule, StockModule, LogModule, AttachmentModule, PurchaseModule, ReceivedModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Diretório onde os arquivos estão armazenados
    serveRoot: '/uploads', // URL prefix para acessar arquivos
  }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}