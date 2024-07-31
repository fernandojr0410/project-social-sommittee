import { IsOptional, IsString } from 'class-validator';

export class QueryPeopleDto {
  @IsOptional()
  @IsString()
  searchField?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
