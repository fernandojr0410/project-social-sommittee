import { Stock } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class StockEntity implements Stock {
  id: string;
  product_id: string;
  amount: Decimal;
  created_at: Date;
  updated_at: Date;
}
