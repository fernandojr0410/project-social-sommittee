import { Product } from "@prisma/client";

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string;
  type: string;
}
