import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { LogEntity } from '../entities/log.entity';
import { UpdateLogDto } from '../dto/update-log.dto';

@Injectable()
export class LogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLogDto: CreateLogDto): Promise<LogEntity> {
    const { user_id, ...logData } = createLogDto;

    return await this.prisma.logger.create({
      data: {
        ...logData,
        user: {
          connect: { id: user_id },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            identifier: true,
            telephone: true,
            avatar_url: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<LogEntity[]> {
    return await this.prisma.logger.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            identifier: true,
            telephone: true,
            role: true,
            avatar_url: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<LogEntity> {
    return await this.prisma.logger.findFirst({
      where: { id },
      include: { user: true },
    });
  }

  async update(id: number, updateLogDto: UpdateLogDto): Promise<LogEntity> {
    const { user_id, ...logData } = updateLogDto;

    return await this.prisma.logger.update({
      where: { id },
      data: {
        ...logData,
        user: {
          connect: { id: user_id },
        },
      },
      include: { user: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.logger.delete({
      where: { id },
    });
  }
}
