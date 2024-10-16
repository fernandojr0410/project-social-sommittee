import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyDto } from './create-family.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RemovedMemberDto {
  @IsString()
  @IsNotEmpty()
  people_id: string;
}

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RemovedMemberDto)
  removedMembers?: RemovedMemberDto[];
}
