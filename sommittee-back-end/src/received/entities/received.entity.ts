import { $Enums, Received } from "@prisma/client";
export class ReceivedEntity implements Received {
  id: string;
  date: string;
  condition_product: $Enums.Condition_product;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  donor_id: string;
}
