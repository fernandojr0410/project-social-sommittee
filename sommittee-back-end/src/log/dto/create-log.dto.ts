import { IsInt, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLogDto {

  @IsString()
  @IsOptional()
  path: string

  @IsJSON()
  @IsOptional()
  data: any

  @IsInt()
  @IsNotEmpty()
  status: number

  @IsString()
  @IsOptional()
  method: string

  @IsString()
  @IsNotEmpty()
  user_id: string
}
