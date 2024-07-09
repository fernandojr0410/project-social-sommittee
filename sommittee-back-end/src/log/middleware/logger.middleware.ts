import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { decode } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1];
    let status: number;

    res.on('close', async () => {
      status = res.statusCode;

      const createLogDto = {
        path: req.originalUrl,
        data: req.method === 'GET' ? null : req.body,
        status: status,
        method: req.method,
        user_id: '',
      };

      if (authToken) {
        const decodedToken: any = decode(authToken);

        if (decodedToken && decodedToken.id) {
          createLogDto.user_id = decodedToken.id;
        }
      }

      try {
        await this.prisma.logger.create({
          data: createLogDto,
        });
        console.log('Log salvo com sucesso no banco de dados');
      } catch (error) {
        console.error('Erro ao criar log:', error);
      }
    });

    next();
  }
}

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { PrismaService } from '../../prisma/prisma.service';
// import { decode } from 'jsonwebtoken';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor(private readonly prisma: PrismaService) { }

//   async use(req: Request, res: Response, next: NextFunction) {
//     const authToken = req.headers.authorization?.split(' ')[1];
//     let status: number;

//     // Captura o status da resposta antes de enviar
//     const originalSend = res.send;
//     res.send = function (body) {
//       const result = originalSend.apply(res, arguments); // Chama o método original de send
//       status = res.statusCode; // Captura o status da resposta
//       return result; // Retorna o resultado da função original de send
//     };

//     // Listener para 'finish' para capturar status caso a resposta seja completada
//     res.on('finish', async () => {
//       status = res.statusCode || 200; // Captura o status da resposta
//       const createLogDto = {
//         path: req.originalUrl,
//         data: req.method === 'GET' ? null : req.body,
//         status: status,
//         method: req.method,
//         user_id: '', // Inicializa com string vazia por padrão
//       };

//       // Define user_id se houver um token de autorização válido
//       if (authToken) {
//         const decodedToken: any = decode(authToken);
//         if (decodedToken && decodedToken.id) {
//           createLogDto.user_id = decodedToken.id;
//         }
//       }

//       try {
//         await this.prisma.logger.create({
//           data: createLogDto,
//         });
//         console.log('Log salvo com sucesso no banco de dados');
//       } catch (error) {
//         console.error('Erro ao criar log:', error);
//       }
//     });

//     // Middleware para capturar caso o status seja 401
//     res.on('finish', () => {
//       if (status === 401) {
//         const createLogDto = {
//           path: req.originalUrl,
//           data: req.method === 'GET' ? null : req.body,
//           status: 401,
//           method: req.method,
//           user_id: '', // Inicializa com string vazia por padrão
//         };

//         try {
//           // Registra o log apenas se não houver um token de autorização válido
//           if (!authToken) {
//             this.prisma.logger.create({
//               data: createLogDto,
//             });
//             console.log('Log de 401 salvo com sucesso no banco de dados');
//           }
//         } catch (error) {
//           console.error('Erro ao criar log de 401:', error);
//         }
//       }
//     });

//     // Prossegue para o próximo middleware ou rota
//     next();
//   }
// }

