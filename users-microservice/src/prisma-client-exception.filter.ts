import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;

        return {
          statusCode: status,
          message: message,
        };
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
