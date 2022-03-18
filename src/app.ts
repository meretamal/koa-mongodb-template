import Koa, { Next } from 'koa';
import koaBody from 'koa-body';
import koaCors from '@koa/cors';
import koaLogger from 'koa-logger';
import { RouterContext } from '@koa/router';
import { isHttpError } from '@/utils/errors/is-http-error';
import { router } from './routers';

export const app = new Koa();

app.use(async (ctx: RouterContext, next: Next) => {
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
      console.log(error);
    }
  }
});

app.use(koaBody());
app.use(koaCors());
app.use(koaLogger());

app.use(router.routes());
app.use(router.allowedMethods({ throw: true }));
