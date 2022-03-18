import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimmerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('< Start Timmer.. >');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`< End Timmer ${Date.now() - now}ms >`)),
      );
  }
}