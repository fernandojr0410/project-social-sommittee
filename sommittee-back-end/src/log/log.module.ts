import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepository } from './repositories/log.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [LogController],
  providers: [LogService, LogRepository, PrismaService],
  exports: [LogService],
})
export class LogModule { }
