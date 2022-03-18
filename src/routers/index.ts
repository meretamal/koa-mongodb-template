import { Next } from 'koa';
import Router, { RouterContext } from '@koa/router';
import jwt from 'koa-jwt';
import { config } from '@/config';
import { isHttpError } from '@/utils/errors/is-http-error';
import { usersRouter } from './users.router';
import { authRouter } from './auth.router';

export const router = new Router();

router.use(async (ctx: RouterContext, next: Next) => {
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

router.get('/', (ctx: RouterContext) => {
  ctx.body = {
    message: 'Koa MongoDB Starter',
  };
});

router.use(authRouter.routes());

router.use(jwt({ secret: config.jwt.secret }));

router.use(usersRouter.routes());
