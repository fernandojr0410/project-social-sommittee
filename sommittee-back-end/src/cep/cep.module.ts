import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [CepController],
  providers: [CepService, PrismaService],
})
export class CepModule { }
