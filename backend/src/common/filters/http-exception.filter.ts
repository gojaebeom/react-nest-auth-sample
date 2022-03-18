import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message: string | object = exception.getResponse();

    if (typeof message === 'object') {
      // response 가 객체형태로 매세지를 포함한 여러 값들을 가질경우
      message = message['message'];
      if (typeof message === 'object') {
        // array 타입이 없어서 object 로 한번 더 검사 : message가 배열타입으로 넘어오면 첫번째 메시지만 보이기
        message = message[0];
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
