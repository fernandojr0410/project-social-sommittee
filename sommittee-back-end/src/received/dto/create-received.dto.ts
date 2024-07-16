import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReceivedDto {

  @IsString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  amount: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  address_id: string

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
