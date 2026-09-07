import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseData<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseData<T>> {
    return next.handle().pipe(
      map((data) => new ResponseData(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)),
    );
  }
}