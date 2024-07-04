import { $Enums } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDonorDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsString()
  @IsNotEmpty()
  cpf: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  contact: string

  @IsString()
  @IsNotEmpty()
  type_donor: $Enums.Type_donor
}
