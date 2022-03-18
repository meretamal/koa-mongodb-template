import { Next } from 'koa';
import { RouterContext } from '@koa/router';

export async function isCurrentUserMiddleware(ctx: RouterContext, next: Next) {
  const { authData, user } = ctx.state;
  console.log(authData.sub);
  console.log(user.id);
  if (authData.sub === user.id) {
    await next();
  } else {
    ctx.throw(403, {
      errors: [
        "you don't have the necessary permisions to perform this action",
      ],
    });
  }
}
