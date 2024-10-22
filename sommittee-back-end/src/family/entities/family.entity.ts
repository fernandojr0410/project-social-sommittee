import { Family } from "@prisma/client";

export class FamilyEntity implements Family {
  id: string;
  people_id: string;
  address_id: string;
  created_at: Date;
  updated_at: Date;
}
