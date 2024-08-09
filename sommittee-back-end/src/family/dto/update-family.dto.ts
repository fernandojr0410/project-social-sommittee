import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyDto } from './create-family.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {

  @IsString()
  people_id: string;

  @IsString()
  address_id: string;

  @IsOptional()
  @IsString()
  function?: string;
}
