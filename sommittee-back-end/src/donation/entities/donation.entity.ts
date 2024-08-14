import { $Enums, Donation } from "@prisma/client";

export class DonationEntity implements Donation {
  id: string;
  description: string;
  state: string;
  date_delivery: string;
  observation: string;
  address_zip_code: string;
  address_street: string;
  address_complement: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  created_at: Date;
  updated_at: Date;
  donor_id: string;
  product_id: string;
  stock_id: string;
  userId: string;

}
