// import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
// import { Condition_product } from '@prisma/client';

// export class CreateReceivedDto {
//   @IsString()
//   @IsNotEmpty()
//   date: string;

//   @IsEnum(Condition_product)
//   @IsNotEmpty()
//   condition_product: Condition_product;

//   @IsString()
//   @IsOptional()
//   description?: string;

//   @IsString()
//   @IsNotEmpty()
//   product_id: string;

//   @IsString()
//   @IsNotEmpty()
//   donor_id: string;

//   @IsString()
//   @IsNotEmpty()
//   stock_id: string;

//   @IsString()
//   @IsNotEmpty()
//   user_id: string;
// }
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Condition_product } from '@prisma/client';

class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  amount: number;
}

class DonorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  type_donor: string;
}

export class CreateReceivedDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsEnum(Condition_product)
  @IsNotEmpty()
  condition_product: Condition_product;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  donor_id: string;

  @IsString()
  @IsNotEmpty()
  stock_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  product: ProductDto[];

  @ValidateNested()
  @Type(() => DonorDto)
  donor: DonorDto;
}
