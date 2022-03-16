import { Next } from 'koa';
import { RouterContext } from '@koa/router';
import { User } from '@/models/user.model';

export async function findUserByIdMiddleware(ctx: RouterContext, next: Next) {
  const { id } = ctx.params;
  const user = await User.findById(id).exec();
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: 'Not found',
      errors: [`user with ObjectId ${id} does not exist`],
    };
  } else {
    ctx.state.user = user;
    await next();
  }
}
