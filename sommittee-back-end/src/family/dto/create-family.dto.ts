import { IsNotEmpty, IsUUID, IsArray } from 'class-validator';

export class CreateFamilyDto {
  @IsUUID()
  @IsNotEmpty()
  address_id: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  people_id: string[];
}
