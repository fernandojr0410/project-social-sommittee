import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStockDto {

  @IsString()
  @IsNotEmpty()
  amount: string

  @IsString()
  @IsNotEmpty()
  product_id: string

  @IsString()
  @IsOptional()
  donation_id?: string
}
