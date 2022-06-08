import { Next } from 'koa';
import { RouterContext } from '@koa/router';
import { prisma } from '@/prisma/client.prisma';

export async function findUserByIdMiddleware(ctx: RouterContext, next: Next) {
  const { id } = ctx.params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    ctx.throw(404, { errors: [`user with ObjectId ${id} does not exist`] });
  } else {
    ctx.state.user = user;
    await next();
  }
}
