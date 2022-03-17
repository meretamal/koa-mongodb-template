import Router, { RouterContext } from '@koa/router';
import { usersRouter } from './users.router';
import { authRouter } from './auth.router';

export const router = new Router();

router.get('/', (ctx: RouterContext) => {
  ctx.body = {
    message: 'Koa MongoDB Starter',
  };
});

router.use(usersRouter.routes());
router.use(authRouter.routes());
