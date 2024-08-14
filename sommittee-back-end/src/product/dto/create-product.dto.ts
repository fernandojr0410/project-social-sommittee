import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateStockDto } from "src/stock/dto/create-stock.dto";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  stock: CreateStockDto;

  @IsString()
  @IsOptional()
  donor_id?: string;
}
