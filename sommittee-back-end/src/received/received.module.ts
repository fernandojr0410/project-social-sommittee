import { Module } from '@nestjs/common';
import { ReceivedService } from './received.service';
import { ReceivedController } from './received.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReceivedRepository } from './repositories/received.repository';

@Module({
  imports: [],
  providers: [ReceivedService, PrismaService, ReceivedRepository],
  controllers: [ReceivedController],
})
export class ReceivedModule { }
