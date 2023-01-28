import { RouterContext } from '@koa/router';
import { IUpdateUserDTO } from './dtos/update-user.dto';
import { UsersRepository } from './users.repository';

export class UsersController {
  static async list(ctx: RouterContext) {
    const users = await UsersRepository.findAll();
    ctx.body = users;
  }

  static async detail(ctx: RouterContext) {
    const { user } = ctx.state;
    ctx.body = user;
  }

  static async update(ctx: RouterContext) {
    const data = <IUpdateUserDTO>ctx.request.body;
    const user = await UsersRepository.update(ctx.params.id, data);
    ctx.body = user;
  }

  static async delete(ctx: RouterContext) {
    await UsersRepository.delete(ctx.params.id);
    ctx.body = {
      message: 'Deleted',
    };
  }
}
