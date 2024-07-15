import { Purchase } from "@prisma/client";

export class PurchaseEntity implements Purchase {
  id: string;
  purchase_date: string;
  supplier: string;
  value_amount: number;
  status: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
  receipt_id: string;
  stock_id: string;
}
