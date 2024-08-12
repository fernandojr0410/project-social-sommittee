import { IsOptional, IsString } from "class-validator";

export class QueryProductDto {

  @IsOptional()
  @IsString()
  searchField?: string

  @IsOptional()
  @IsString()
  search?: string
}