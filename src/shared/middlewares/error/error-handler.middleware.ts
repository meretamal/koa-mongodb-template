import { Next } from 'koa';
import { RouterContext } from '@koa/router';
import { isHttpError } from 'http-errors';

export async function errorHandlerMiddleware(ctx: RouterContext, next: Next) {
  try {
    await next();
  } catch (error) {
    if (isHttpError(error)) {
      ctx.status = error.statusCode || error.status;
      const { message, errors } = error;
      ctx.body = {
        message,
        errors,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: 'Internal Server Error',
      };
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
