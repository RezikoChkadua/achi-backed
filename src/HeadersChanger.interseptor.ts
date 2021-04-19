import { CallHandler, ExecutionContext, NestInterceptor, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const http = context.switchToHttp();
        const res = http.getResponse();

        console.log(res)

        return classToPlain(data);
      }),
    );
  }
}
