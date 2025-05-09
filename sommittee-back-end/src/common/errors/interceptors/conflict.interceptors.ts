import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ConflictException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConflictError } from '../types/conflictError';

@Injectable()
export class ConflictInterception implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ConflictError) {
          throw new ConflictException(error.message)
        } else {
          throw error;
        }
      })
    )
  }
}