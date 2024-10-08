import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTwoFactorDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
