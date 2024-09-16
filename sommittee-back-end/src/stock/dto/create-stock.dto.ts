import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStockDto {

  // @IsDecimal()
  // @IsNotEmpty()
  // amount: Decimal

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  product_id: string

  @IsString()
  @IsOptional()
  donation_id?: string
}
