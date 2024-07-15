import { $Enums, People } from "@prisma/client";

export class PeopleEntity implements People {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  email: string;
  birth_date: string;
  gender: $Enums.Gender;
  telephone: string;
  work: boolean;
  education: string;
  created_at: Date;
  updated_at: Date;
  address_id: string;
}
