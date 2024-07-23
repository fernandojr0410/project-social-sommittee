import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  telephone: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  role: $Enums.Role

  @IsString()
  @IsOptional()
  avatar: string
}