import { IsOptional, IsString } from "class-validator";

export class QueryDonationDto {

  @IsString()
  @IsOptional()
  searchField?: string

  @IsString()
  @IsOptional()
  search?: string
}