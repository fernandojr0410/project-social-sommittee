import { Stock } from "@prisma/client";

export class StockEntity implements Stock {
  id: string;
  amount: string;
  created_at: Date;
  updated_at: Date;
}
