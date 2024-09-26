import { IsNumber, IsString } from 'class-validator';

export class ProductDashboardDto {
  @IsString()
  product_id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;
}
