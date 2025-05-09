import { IsNotEmpty, IsString, IsEnum, IsOptional, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Condition_product } from '@prisma/client';
import { Type_donor } from '@prisma/client';
class ProductDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  type: string

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

class DonorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsEnum(Type_donor)
  @IsNotEmpty()
  type_donor: Type_donor;
}

export class CreateReceivedDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsEnum(Condition_product)
  @IsNotEmpty()
  condition_product: Condition_product;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  donor_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DonorDto)
  donor?: DonorDto;
}
