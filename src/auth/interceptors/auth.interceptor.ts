import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { User } from "src/users/entities/user.entity";



export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      
    );
  }
}