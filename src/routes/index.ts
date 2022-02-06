import Router, { RouterContext } from '@koa/router';

export const router = new Router();

router.get('/', (ctx: RouterContext) => {
  ctx.body = {
    message: 'Koa MongoDB Starter',
  }
});
