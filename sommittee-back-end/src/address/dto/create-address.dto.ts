import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {

  @IsString()
  @IsNotEmpty()
  zip_code: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  complement: string

  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  state: string
}
