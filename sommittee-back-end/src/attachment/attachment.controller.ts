import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, UploadedFile, UseInterceptors, Req, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { AuthGuard } from "../auth/auth.guard";
import { AttachmentService } from "./attachment.service";
import { CreateAttachmentDto } from "./dto/create-attachment.dto";
import { UpdateAttachmentDto } from "./dto/update-attachment.dto";

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createAttachmenDto: CreateAttachmentDto) {
    return await this.attachmentService.create(createAttachmenDto)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const attachment = await this.attachmentService.findById(id);
    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }
    return attachment;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return await this.attachmentService.update(id, updateAttachmentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const attachment = await this.attachmentService.remove(id);
    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }
    return attachment;
  }
}
