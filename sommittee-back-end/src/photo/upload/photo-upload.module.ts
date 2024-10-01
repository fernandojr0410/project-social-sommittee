import { Module } from '@nestjs/common';
import { UploadController } from './photo-upload.controller';
import { UploadService } from './photo-upload.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [UploadService, PrismaService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
