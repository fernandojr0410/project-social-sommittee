import { Receipt } from "@prisma/client";

export class ReceiptEntity implements Receipt {
  id: string;
  issue_date: string;
  description: string;
  type_transaction: string;
  value_amount: string;
  quantity: string;
  payment_method: string;
  receiver_signature: string;
  additional_notes: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  product_id: string;
  donor_id: string;
  stock_id: string;
}
