import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PeopleRepository } from './repositories/people.repository';

@Module({
  imports: [],
  providers: [PeopleService, PrismaService, PeopleRepository],
  controllers: [PeopleController],
})
export class PeopleModule { }
