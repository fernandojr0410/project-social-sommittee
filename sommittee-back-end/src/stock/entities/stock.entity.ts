import { Stock } from "@prisma/client";

export class StockEntity implements Stock {
  id: string;
  amount: string;
  product_id: string;
  donation_id: string;
  created_at: Date;
  updated_at: Date;
}
