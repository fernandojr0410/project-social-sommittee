import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { LogService } from '../log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1];
    const { body } = req;

    res.on('finish', async () => {
      const createLogDto = {
        path: req.originalUrl,
        data: this.filterPassword(body),
        status: res.statusCode,
        method: req.method,
        user_id: null,
      };

      if (authToken) {
        const decodedToken: any = decode(authToken);

        if (decodedToken && decodedToken.id) {
          createLogDto.user_id = decodedToken.id;
          console.log("decodedToken.id", decodedToken.id);
        }
        console.log("decodedToken", decodedToken);
      }

      console.log('createLogDto final antes de salvar', createLogDto);

      await this.logService.create(createLogDto).catch((error) => {
        console.error('Error saving log:', error);
      });
    });

    next();
  }

  private filterPassword(body: any): any {
    if (body && body.password) {
      delete body.password;
    }
    return body;
  }
}
