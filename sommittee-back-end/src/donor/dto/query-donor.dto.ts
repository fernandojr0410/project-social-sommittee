import { IsOptional, IsString } from "class-validator";

export class QueryDonorDto {

  @IsOptional()
  @IsString()
  searchField?: string

  @IsOptional()
  @IsString()
  search?: string
}