import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

Prisma.Decimal.prototype.toJSON = function () {
  return this.toNumber();
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(this.dateTimeMiddleware);
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  private dateTimeMiddleware = async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ) => {
    const result = await next(params);

    const formatDateTime = (obj: any) => {
      for (const key in obj) {
        if (obj[key] instanceof Date) {
          obj[key] = obj[key].toISOString();
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          formatDateTime(obj[key]);
        }
      }
    };

    if (Array.isArray(result)) {
      result.forEach((item) => formatDateTime(item));
    } else if (typeof result === 'object' && result !== null) {
      formatDateTime(result);
    }

    return result;
  };
}
