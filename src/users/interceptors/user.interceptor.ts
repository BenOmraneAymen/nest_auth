import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map, tap } from 'rxjs';
import { User } from '../entities/user.entity';

export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(map((data) => data.map((user:User) => plainToInstance(User, user))));
  }
}
