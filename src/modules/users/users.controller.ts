import { RouterContext } from '@koa/router';
import { prisma } from '@/prisma/client.prisma';
import { IUpdateUserRequest } from './types/requests/update-user.request';

export class UsersController {
  static async list(ctx: RouterContext) {
    const users = await prisma.user.findMany();
    ctx.body = users;
  }

  static async detail(ctx: RouterContext) {
    const { user } = ctx.state;
    ctx.body = user;
  }

  static async update(ctx: RouterContext) {
    const data = <IUpdateUserRequest>ctx.request.body;
    const user = await prisma.user.update({
      where: {
        id: ctx.params.id,
      },
      data,
    });
    ctx.body = user;
  }

  static async delete(ctx: RouterContext) {
    await prisma.user.delete({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.body = {
      message: 'Deleted',
    };
  }
}
