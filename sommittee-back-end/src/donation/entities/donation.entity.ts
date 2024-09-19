import { Donation } from '@prisma/client';

export class DonationEntity implements Donation {
  id: string;
  state: string;
  date_delivery: string;
  observation: string;
  donor_id: string;
  people_id: string;
  family_id: string;
  created_at: Date;
  updated_at: Date;
}
