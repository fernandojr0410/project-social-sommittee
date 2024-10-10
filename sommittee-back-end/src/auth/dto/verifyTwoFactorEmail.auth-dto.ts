import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTwoFactorEmail {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
