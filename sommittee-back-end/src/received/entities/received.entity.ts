import { Received } from "@prisma/client";

export class ReceivedEntity implements Received {
  id: string;
  date: string;
  amount: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  address_id: string;
  product_id: string;
  donor_id: string;
  stock_id: string;
}
