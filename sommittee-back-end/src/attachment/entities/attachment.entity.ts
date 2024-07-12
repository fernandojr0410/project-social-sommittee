import { Attachment } from "@prisma/client";

export class AttachmentEntity implements Attachment {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  donation_id: string;
}
