import { $Enums, People } from "@prisma/client";

export class PeopleEntity implements People {
  id: string;
  name: string;
  surname: string;
  birth_date: string;
  gender: $Enums.Gender;
  telephone: string;
  work: boolean;
  education: string;
  address_id: string;
}
