import { $Enums, Donor } from "@prisma/client";

export class DonorEntity implements Donor {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  email: string;
  contact: string;
  type_donor: $Enums.Type_donor;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
