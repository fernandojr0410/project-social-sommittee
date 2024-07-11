import { Logger, Prisma } from "@prisma/client";

export class LogEntity implements Logger {
  id: number;
  path: string;
  data: Prisma.JsonValue;
  status: number;
  method: string;
  user_id: string;
  created_at: Date;
}
