import { Family } from "@prisma/client";

export class FamilyEntity implements Family {
  id: string;
  address_id: string;
}
