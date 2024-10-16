import { Logger, Prisma } from '@prisma/client';

export class LogEntity implements Logger {
  id: number;
  path: string;
  status: number;
  method: string;
  payload: Prisma.JsonValue;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
