import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.log('Token não encontrado');
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: Buffer.from(process.env.JWT_SECRET, 'base64').toString(),

        algorithms: ['HS256'],
      });

      console.log('Token JWT válido:', payload);

      const tokenInDb = await this.prisma.token.findFirst({
        where: {
          access_token: token,
        },
      });

      if (!tokenInDb || tokenInDb.is_revoked) {
        console.log('Token revogado');
        throw new UnauthorizedException('Token Revogado!');
      }

      request.user = payload;
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('Token expirado');
        throw new UnauthorizedException('Token expirado');
      }

      console.log('Token inválido');
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const [type, token] = authorizationHeader.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }
    return undefined;
  }
}
