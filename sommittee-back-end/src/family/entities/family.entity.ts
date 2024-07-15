import { Family } from "@prisma/client";

export class FamilyEntity implements Family {
  id: string;
  created_at: Date;
  updated_at: Date;
  address_id: string;
}
