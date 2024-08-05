import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePeopleFamilyDto {
  @IsString()
  @IsNotEmpty()
  people_id: string;

  @IsString()
  @IsNotEmpty()
  family_id: string;

  @IsString()
  @IsNotEmpty()
  function: string;
}
