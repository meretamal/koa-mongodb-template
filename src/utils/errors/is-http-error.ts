import { IHttpError } from '@/interfaces/errors/http-error.interface';

export function isHttpError(error: any): error is IHttpError {
  return (
    (typeof error.status === 'number' ||
      typeof error.statusCode === 'number') &&
    typeof error.message === 'string'
  );
}
