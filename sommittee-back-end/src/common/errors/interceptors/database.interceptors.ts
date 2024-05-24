import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPrismaError } from '../utils/is-prisma-error';
import { handleDatabaseErrors } from '../utils/handle.database-errors.utils';
import { DatabaseError } from '../types/databaseError';

@Injectable()
export class DatabaseInterception implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);
        }
        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message)
        } else {
          throw error;
        }
      })
    )
  }
}