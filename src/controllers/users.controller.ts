import { RouterContext } from '@koa/router';
import { User } from '@/models/user.model';
import { CreateUserDto } from '@/interfaces/dtos/users/create-user.dto';

export class UsersController {
  static async create(ctx: RouterContext) {
    const data = <CreateUserDto>ctx.request.body;
    const existingUser = await User.findOne({ email: data.email }).exec();
    if (existingUser) {
      ctx.status = 409;
      ctx.body = {
        message: 'Conflict',
        errors: [`user with email ${data.email} already exists`],
      };
    } else {
      const user = new User(data);
      try {
        await user.save();
        ctx.status = 201;
        ctx.body = user;
      } catch (error) {
        ctx.status = 422;
        ctx.body = {
          message: 'Unprocessable entity',
        };
      }
    }
  }

  static async list(ctx: RouterContext) {
    const users = await User.find();
    ctx.body = users;
  }
}
