import { People_Family } from "@prisma/client";

export class PeopleFamilyEntity implements People_Family {
  id: string;
  function: string;
  people_id: string;
  family_id: string;
}
