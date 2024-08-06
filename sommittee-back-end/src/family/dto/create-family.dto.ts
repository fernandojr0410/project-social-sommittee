import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  @IsNotEmpty()
  address_id: string;

  @IsString()
  @IsNotEmpty()
  people_id: string;
}
