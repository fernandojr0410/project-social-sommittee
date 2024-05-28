import { Module, Logger } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';
const LokiTransport = require('winston-loki');

@Module({
  providers: [
    {
      provide: Logger,
      useValue: createWinstonLogger(),
    },
  ],
  exports: [Logger],
})
export class LoggerModule { }

function createWinstonLogger() {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.Console(),
      new LokiTransport({
        host: 'http://localhost:3100',
        json: true,
        labels: { job: 'nestjs-app' }
      })
    ],
  });
}

export const loggerProvider = {
  provide: Logger,
  useValue: createWinstonLogger(),
};
