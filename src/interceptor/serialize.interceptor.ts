import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { catchError, map, Observable } from 'rxjs';

export function Serialize(dto?: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (!this.dto) return data;

        const response = context.switchToHttp().getResponse<Response>();

        return {
          success: true,
          statusCode: response.statusCode.toString(),
          payload: plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          }),
        };
      }),
      catchError((err) => {
        console.log('executed');
        throw err;
      }),
    );
  }
}
