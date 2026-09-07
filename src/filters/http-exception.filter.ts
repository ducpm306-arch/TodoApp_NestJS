import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json(
      new ResponseData(null, status, exception.message || HttpMessage.ERROR),
    );
  }
}