import { RouterContext } from '@koa/router';
import { User } from '@/models/user.model';
import { SignInDto } from '@/interfaces/dtos/auth/sign-in.dto';

export class AuthController {
  static async signIn(ctx: RouterContext) {
    const { email, password } = <SignInDto>ctx.request.body;
    const user = await User.findOne({ email });
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        message: 'Not found',
        errors: [`user with email ${email} does not exist`],
      };
    } else {
      const doPasswordsMatch = await user.comparePassword(password);
      if (doPasswordsMatch) {
        ctx.body = user;
      } else {
        ctx.status = 401;
        ctx.body = {
          message: 'Unauthorized',
          errors: ['incorrect password'],
        };
      }
    }
  }
}
