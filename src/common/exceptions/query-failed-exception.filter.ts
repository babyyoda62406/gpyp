import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { CustomDriverError } from '../interfaces/CustomDriveError';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError & CustomDriverError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    
    let status = HttpStatus.SERVICE_UNAVAILABLE;
    switch (exception.code) {
      case '22001': // String data right truncation
        status = HttpStatus.BAD_REQUEST;
        break;
      case '23502': // Not null violation
        status = HttpStatus.BAD_REQUEST;
        break;
      case '23505': // Duplicate key violation
        status = HttpStatus.CONFLICT;
        break;
      case '23503': // Foreign key violation
        status = HttpStatus.PRECONDITION_FAILED;
        break;
      case '23506': // Invalid foreign key
        status = HttpStatus.PRECONDITION_FAILED;
        break;
      case '23514': // Check constraint violation
        status = HttpStatus.BAD_REQUEST;
        break;
      default: // Default for unhandled exceptions
        status = HttpStatus.SERVICE_UNAVAILABLE;
        break;
    }
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      details: {
        severity: exception.severity,
        code: exception.code,
        detail: exception.detail,
        schema: exception.schema,
        table: exception.table,
        constraint: exception.constraint,
        routine: exception.routine,
      }
    });
  }
}
