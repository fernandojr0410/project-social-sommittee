import { $Enums, People_Family } from "@prisma/client";

export class PeopleFamilyEntity implements People_Family {
  id: string;
  function: string;
  created_at: Date;
  updated_at: Date;
  people_id: string;
  family_id: string;

}
