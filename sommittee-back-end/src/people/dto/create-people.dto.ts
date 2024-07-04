import { $Enums } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePeopleDto {

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
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  birth_date: string

  @IsString()
  @IsNotEmpty()
  gender: $Enums.Gender

  @IsString()
  @IsNotEmpty()
  telephone: string

  @IsBoolean()
  @IsNotEmpty()
  work: boolean

  @IsString()
  @IsNotEmpty()
  education: string

  @IsString()
  @IsNotEmpty()
  address_id: string
}
