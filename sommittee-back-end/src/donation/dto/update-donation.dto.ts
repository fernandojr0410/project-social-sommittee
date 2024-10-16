import { PartialType } from '@nestjs/mapped-types';
import { CreateDonationDto } from './create-donation.dto';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsUUID()
  product_id: string;

  @IsOptional()
  amount: number;
}

export class UpdateDonationDto extends PartialType(CreateDonationDto) {
  @IsOptional()
  @IsDateString()
  date_delivery?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsUUID()
  donor_id?: string;

  @IsOptional()
  @IsUUID()
  people_id?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products?: ProductDto[];
}
