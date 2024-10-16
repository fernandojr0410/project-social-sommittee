import { $Enums } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  identifier?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  role?: $Enums.Role;

  @IsNumber()
  @IsOptional()
  failed_attempts?: number;

  @IsBoolean()
  @IsOptional()
  account_locked?: boolean;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
