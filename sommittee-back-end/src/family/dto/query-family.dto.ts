import { IsOptional, IsString } from 'class-validator';
export class QueryFamilyDto {
  @IsOptional()
  @IsString()
  searchField?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
