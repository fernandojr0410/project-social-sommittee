import { IsNotEmpty, IsString } from "class-validator";

export class CreateStockDto {

  @IsString()
  @IsNotEmpty()
  amount: string

  @IsString()
  @IsNotEmpty()
  product_id: string

  @IsString()
  @IsNotEmpty()
  donation_id: string
}
