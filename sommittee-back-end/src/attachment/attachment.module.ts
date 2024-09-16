import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AttachmentRepository } from './repositories/attachment.repository';

@Module({
  imports: [],
  providers: [AttachmentService, PrismaService, AttachmentRepository],
  controllers: [AttachmentController],
})
export class AttachmentModule { }
