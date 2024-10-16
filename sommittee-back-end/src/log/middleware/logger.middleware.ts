import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { LogService } from '../log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1];
    const { body } = req;

    const payload = this.generatePayload(req, body);

    res.on('finish', async () => {
      const createLogDto = {
        path: req.originalUrl,
        status: res.statusCode,
        method: req.method,
        user_id: null,
        payload,
      };

      if (authToken) {
        const decodedToken: any = decode(authToken);
        if (decodedToken && decodedToken.id) {
          createLogDto.user_id = decodedToken.id;
        }
      }

      await this.logService.create(createLogDto).catch((error) => {
        console.error('Erro ao salvar o log:', error);
      });
    });

    next();
  }

  private generatePayload(req: Request, body: any): any {
    let payload = {};

    if (req.originalUrl.includes('/people')) {
      if (req.method === 'POST') {
        payload = {
          action: 'Cadastrou uma nova pessoa',
          personData: this.extractPersonData(body),
        };
      } else if (req.method === 'PATCH' || req.method === 'PUT') {
        payload = {
          action: 'Atualizou os dados da pessoa',
          personData: body,
        };
      }
    }

    return payload;
  }

  private extractPersonData(body: any): any {
    return {
      name: body.name,
      identifier: body.identifier,
      email: body.email,
      telephone: body.telephone,
      birth_date: body.birth_date,
      gender: body.gender,
      work: body.work,
      education: body.education,
      address: {
        zip_code: body.address?.zip_code,
        street: body.address?.street,
        number: body.address?.number,
        complement: body.address?.complement,
        neighborhood: body.address?.neighborhood,
        city: body.address?.city,
        state: body.address?.state,
      },
    };
  }
}
