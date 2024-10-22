import { IsString, IsNotEmpty } from 'class-validator';

export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
export class VerifySmsDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  smsCode: string;
}
