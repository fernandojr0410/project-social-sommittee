import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogRepository } from './repositories/log.repository';

@Module({
  imports: [],
  providers: [LogService, PrismaService, LogRepository],
  controllers: [LogController],
})
export class LogModule { }
