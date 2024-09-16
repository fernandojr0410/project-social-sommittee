import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttachmentDto {

  @IsString()
  @IsNotEmpty()
  file_path: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  donation_id: string
}