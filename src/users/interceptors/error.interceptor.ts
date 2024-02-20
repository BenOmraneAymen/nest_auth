import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { TypeORMError } from 'typeorm';

export class ErrorInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        let errorType = "error";
        if (err instanceof TypeORMError) {
          errorType = "database";
        }
        if (err instanceof HttpException) {
          errorType = "http";
        }
        return throwError(
          () =>
            new HttpException(
              {
                type : errorType,
                message: (err?.response?.message!= undefined && err?.response?.message[0]) || err?.message || err?.detail || 'Something went wrong',
                timestamp: new Date().toISOString(),
              },
              err.statusCode || 500,    
            ),
        );
      }),
    );
  }
}
