import { IsOptional, IsString } from "class-validator";

export class QueryAddressDto {
  @IsOptional()
  @IsString()
  searchField?: string

  @IsOptional()
  @IsString()
  search?: string
}

