import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAttachmentDto {

  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  donation_id: string
}