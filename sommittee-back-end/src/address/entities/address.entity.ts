import { Address } from "@prisma/client";

export class AddressEntity implements Address {
  id: string;
  zip_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}
