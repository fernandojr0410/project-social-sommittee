import { IsNotEmpty, IsString, IsEnum, IsOptional, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Condition_product } from '@prisma/client';
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

  @IsString()
  @IsNotEmpty()
  type_donor: string;
}
export class UpdateReceivedDto {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsEnum(Condition_product)
  condition_product?: Condition_product;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  donor_id?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DonorDto)
  donor?: DonorDto;
}
