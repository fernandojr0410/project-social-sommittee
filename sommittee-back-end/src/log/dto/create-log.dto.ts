import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLogDto {
  @IsString()
  @IsOptional()
  path: string;

  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsOptional()
  method: string;

  @IsString()
  @IsOptional()
  payload: any;

  @IsString()
  @IsOptional()
  user_id: string;
}
