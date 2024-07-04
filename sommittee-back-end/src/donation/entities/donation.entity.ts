import { $Enums, Donation } from "@prisma/client";

export class DonationEntity implements Donation {
  id: string;
  description: string;
  state: $Enums.State;
  date: Date;
  address_zip_code: string;
  address_street: string;
  address_complement: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  user_id: string;
  donor_id: string;
}
