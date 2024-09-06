import { Purchase } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class PurchaseEntity implements Purchase {
  id: string;
  purchase_date: string;
  supplier: string;
  amount: Decimal;
  status: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
  received_id: string;
  stock_id: string;
}
