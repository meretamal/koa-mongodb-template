import { RouterContext } from '@koa/router';
import { User } from '@/models/user.model';
import { IUpdateUserDto } from '@/interfaces/dtos/users/update-user.dto';

export class UsersController {
  static async list(ctx: RouterContext) {
    const users = await User.find();
    ctx.body = users;
  }

  static async detail(ctx: RouterContext) {
    const { user } = ctx.state;
    ctx.body = user;
  }

  static async update(ctx: RouterContext) {
    const data = <IUpdateUserDto>ctx.request.body;
    const user = await User.findByIdAndUpdate(ctx.params.id, data, {
      new: true,
    });
    ctx.body = user;
  }

  static async delete(ctx: RouterContext) {
    await User.findByIdAndDelete(ctx.params.id);
    ctx.body = {
      message: 'Deleted',
    };
  }
}
