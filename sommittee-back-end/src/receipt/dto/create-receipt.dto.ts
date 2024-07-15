import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReceiptDto {

  @IsString()
  @IsNotEmpty()
  issue_date: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  type_transaction: string

  @IsString()
  @IsNotEmpty()
  value_amount: string

  @IsString()
  @IsNotEmpty()
  quantity: string

  @IsString()
  @IsNotEmpty()
  payment_method: string

  @IsString()
  @IsOptional()
  receiver_signature: string

  @IsString()
  @IsOptional()
  additional_notes: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  product_id: string

  @IsString()
  @IsNotEmpty()
  donor_id: string

  @IsString()
  @IsNotEmpty()
  stock_id: string

}
