import { $Enums, User } from "@prisma/client";
export class UserEntity implements User {
  id: string;
  name: string;
  identifier: string;
  email: string;
  telephone: string;
  password: string;
  role: $Enums.Role;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  last_action: string;
}