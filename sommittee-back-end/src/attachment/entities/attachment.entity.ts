import { Attachment } from "@prisma/client";

export class AttachmentEntity implements Attachment {
  id: string;
  file_path: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  donation_id: string;
}
