import { RouterContext } from '@koa/router';
import { User } from '@/models/user.model';
import { SignInDto } from '@/interfaces/dtos/auth/sign-in.dto';
import { SignUpDto } from '@/interfaces/dtos/auth/sign-up.dto';
import { generateToken } from '@/utils/jwt/generate-token';

export class AuthController {
  static async signUp(ctx: RouterContext) {
    const data = <SignUpDto>ctx.request.body;
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
        const token = await generateToken(user);
        ctx.status = 201;
        ctx.body = {
          token,
          type: 'Bearer',
        };
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
