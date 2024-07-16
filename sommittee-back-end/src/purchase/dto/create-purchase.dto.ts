import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePurchaseDto {

  @IsString()
  @IsNotEmpty()
  purchase_date: string

  @IsString()
  @IsNotEmpty()
  supplier: string

  @IsNumber()
  @IsNotEmpty()
  value_amount: number

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
