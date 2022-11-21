import Koa from 'koa';
import koaBody from 'koa-body';
import koaCors from '@koa/cors';
import koaLogger from 'koa-logger';
import { router } from './router';
import { errorHandlerMiddleware } from './shared/middlewares/error/error-handler.middleware';

export const app = new Koa();

app.use(errorHandlerMiddleware);

app.use(koaBody());
app.use(koaCors());

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(router.routes());
app.use(router.allowedMethods({ throw: true }));
