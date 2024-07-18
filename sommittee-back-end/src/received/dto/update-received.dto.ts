import { PartialType } from '@nestjs/mapped-types';
import { CreateReceivedDto } from './create-received.dto';
import { IsOptional, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  zip_code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state?: string;
}

class ProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string
}

class StockDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value?: string
}

export class UpdateReceivedDto extends PartialType(CreateReceivedDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  product?: ProductDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  stock?: StockDto;
}
