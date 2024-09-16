import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  @IsNotEmpty()
  people_id: string;

  @IsString()
  @IsNotEmpty()
  address_id: string;

  @IsOptional()
  @IsString()
  function?: string;
}

