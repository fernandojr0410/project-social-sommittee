import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttachmentRepository } from './repositories/attachment.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // diretório onde os arquivos serão armazenados temporariamente
    }),
  ],
  providers: [AttachmentService, PrismaService, AttachmentRepository],
  controllers: [AttachmentController],
})
export class AttachmentModule { }
