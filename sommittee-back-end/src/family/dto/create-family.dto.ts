import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateFamilyDto {

  @IsUUID()
  @IsNotEmpty()
  address_id: string
}
