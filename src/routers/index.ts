import Router, { RouterContext } from '@koa/router';
import { usersRouter } from './users.router';

export const router = new Router();

router.get('/', (ctx: RouterContext) => {
  ctx.body = {
    message: 'Koa MongoDB Starter',
  };
});

router.use(usersRouter.routes());
