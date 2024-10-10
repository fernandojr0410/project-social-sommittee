import { $Enums, User } from '@prisma/client';
export class UserEntity implements User {
  id: string;
  name: string;
  identifier: string;
  email: string;
  telephone: string;
  password: string;
  role: $Enums.Role;
  avatar_url: string;
  two_factor_secret: string;
  is_two_factor_enabled: boolean;
  failed_attempts: number;
  account_locked: boolean;
  created_at: Date;
  updated_at: Date;
  last_action: string;
}
