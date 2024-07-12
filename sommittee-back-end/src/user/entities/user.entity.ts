import { $Enums, User } from "@prisma/client";
export class UserEntity implements User {
  id: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  password: string;
  role: $Enums.Role;
  created_at: Date;
  updated_at: Date;
  last_action: string;
}