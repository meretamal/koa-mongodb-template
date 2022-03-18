import Router, { RouterContext } from '@koa/router';
import jwt from 'koa-jwt';
import { config } from '@/config';
import { usersRouter } from './users.router';
import { authRouter } from './auth.router';

export const router = new Router();

router.get('/', (ctx: RouterContext) => {
  ctx.body = {
    message: 'Koa MongoDB Starter',
  };
});

router.use(authRouter.routes());

router.use(jwt({ secret: config.jwt.secret }));

router.use(usersRouter.routes());
