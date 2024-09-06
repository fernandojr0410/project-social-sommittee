import { $Enums, Received } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
export class ReceivedEntity implements Received {
  id: string;
  date: string;
  condition_product: $Enums.Condition_product;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  product_id: string;
  donor_id: string;
  stock_id: string;

}
