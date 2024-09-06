import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber({}, { message: 'Amount must be a decimal number' })
  @IsNotEmpty()
  amount: number;
}

export class UpdateReceivedDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber({}, { message: 'Amount must be a decimal number' })
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  product_id?: string;

  @Type(() => ProductDto)
  @IsOptional()
  product?: ProductDto[];

  @IsUUID()
  @IsOptional()
  donor_id?: string;

  @IsUUID()
  @IsOptional()
  stock_id?: string;
}
