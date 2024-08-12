import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StockDto {
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  donation_id: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => StockDto)
  stock?: StockDto;
}
