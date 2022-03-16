import { RouterContext } from '@koa/router';
import { User } from '@/models/user.model';
import { CreateUserDto } from '@/interfaces/dtos/users/create-user.dto';

export class UsersController {
  static async create(ctx: RouterContext) {
    const data = <CreateUserDto>ctx.request.body;
    const existingUser = await User.findOne({ email: data.email }).exec();
    if (existingUser) ctx.throw(409);
    const user = new User(data);
    try {
      await user.save();
      ctx.body = user;
      ctx.status = 201;
    } catch (error) {
      ctx.throw(422);
    }
  }
}
