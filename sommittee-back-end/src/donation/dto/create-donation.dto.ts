import { $Enums } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDonationDto {

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  state: $Enums.State

  @IsString()
  @IsNotEmpty()
  address_zip_code: string

  @IsString()
  @IsNotEmpty()
  address_street: string

  @IsString()
  @IsOptional()
  address_complement: string

  @IsString()
  @IsNotEmpty()
  address_neighborhood: string

  @IsString()
  @IsNotEmpty()
  address_city: string

  @IsString()
  @IsNotEmpty()
  address_state: string

  @IsString()
  @IsOptional()
  user_id: string

  @IsString()
  @IsOptional()
  donor_id: string
}
