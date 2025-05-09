import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  date_delivery: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsString()
  @IsNotEmpty()
  donor_id: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => Object)
  products: {
    product_id: string;
    amount: number;
  }[];

  @IsNotEmpty()
  @IsString()
  people_id: string;
}
