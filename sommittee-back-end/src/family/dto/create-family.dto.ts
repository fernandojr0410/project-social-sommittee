import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;
}

class PeopleFamilyDto {
  @IsOptional()
  @IsString()
  function?: string;
}

class PeopleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  education?: string;

  @IsBoolean()
  @IsOptional()
  work?: boolean;
}

export class FamilyMemberDto {
  @IsString()
  @IsNotEmpty()
  people_id: string;

  @IsString()
  @IsNotEmpty()
  address_id: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PeopleFamilyDto)
  people_family?: PeopleFamilyDto;

  @ValidateNested()
  @Type(() => PeopleDto)
  people: PeopleDto;
}

export class CreateFamilyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FamilyMemberDto)
  members: FamilyMemberDto[];
}
