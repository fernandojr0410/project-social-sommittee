import { PartialType } from '@nestjs/mapped-types';
import { CreatePeopleDto } from './create-people.dto';
import { IsOptional, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}

export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto
}
