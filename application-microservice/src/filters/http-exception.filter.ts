import { Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException) {
    console.error(exception.stack);

    return throwError(() => exception.getResponse());
  }
}
