import { IsOptional, IsString } from 'class-validator';

export class QueryReceivedDto {
  @IsOptional()
  @IsString()
  searchField?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
