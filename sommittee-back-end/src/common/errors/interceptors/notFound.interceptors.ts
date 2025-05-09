import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundError } from '../types/notFoundError';

@Injectable()
export class NotFoundInterception implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message)
        } else {
          throw error;
        }
      })
    )
  }
}