import { IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  searchField?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
