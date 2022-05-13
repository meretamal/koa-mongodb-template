import Router, { RouterContext } from '@koa/router';
import jwt from 'koa-jwt';
import { environment } from '@/config/environment';
import { usersRouter } from '../features/users/users.router';
import { authRouter } from '../features/auth/auth.router';

export const router = new Router();

router.get('/', (ctx: RouterContext) => {
  ctx.body = {
    message: `${environment.app.name} API`,
  };
});

router.use(authRouter.routes());

router.use(jwt({ secret: environment.jwt.secret, key: 'authData' }));

router.use(usersRouter.routes());
