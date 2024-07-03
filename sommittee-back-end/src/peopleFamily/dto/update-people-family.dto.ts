import { PartialType } from '@nestjs/mapped-types';
import { CreatePeopleFamilyDto } from './create-people-family.dto';

export class UpdatePeopleFamilyDto extends PartialType(CreatePeopleFamilyDto) {}
