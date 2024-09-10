import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsString()
  @IsNotEmpty()
  date_delivery: string;

  @IsString()
  @IsNotEmpty()
  address_zip_code: string;

  @IsString()
  @IsNotEmpty()
  address_street: string;

  @IsString()
  @IsOptional()
  address_complement?: string;

  @IsString()
  @IsNotEmpty()
  address_neighborhood: string;

  @IsString()
  @IsNotEmpty()
  address_city: string;

  @IsString()
  @IsNotEmpty()
  address_state: string;

  @IsString()
  @IsNotEmpty()
  donor_id: string;

}
