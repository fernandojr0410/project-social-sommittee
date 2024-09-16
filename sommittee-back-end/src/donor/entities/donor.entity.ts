import { $Enums, Donor } from "@prisma/client";

export class DonorEntity implements Donor {
  id: string;
  name: string;
  identifier: string;
  email: string;
  telephone: string;
  type_donor: $Enums.Type_donor;
  created_at: Date;
  updated_at: Date;
}
