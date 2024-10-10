import { $Enums } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: $Enums.Role;

  @IsNumber()
  @IsNotEmpty()
  failed_attempts: number;

  @IsBoolean()
  @IsNotEmpty()
  account_locked: boolean;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
