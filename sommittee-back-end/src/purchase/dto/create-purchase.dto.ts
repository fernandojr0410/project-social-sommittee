import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePurchaseDto {

  @IsString()
  @IsNotEmpty()
  purchase_date: string

  @IsString()
  @IsNotEmpty()
  supplier: string

  @IsDecimal()
  @IsNotEmpty()
  amount: Decimal

  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsOptional()
  notes: string

  @IsString()
  @IsNotEmpty()
  received_id: string

  @IsString()
  @IsNotEmpty()
  stock_id: string
}
