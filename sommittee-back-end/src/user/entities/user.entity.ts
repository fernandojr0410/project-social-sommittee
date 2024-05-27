import { $Enums, User } from "@prisma/client";
export class UserEntity implements User {
  id: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  password: string;
  role: $Enums.Role;
  lastAction: string;
  createdAt: Date;
}