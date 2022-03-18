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
      ctx.throw(409, {
        errors: [`user with email ${data.email} already exists`],
      });
    } else {
      const user = new User(data);
      try {
        await user.save();
        ctx.status = 201;
        ctx.body = user;
      } catch (error) {
        ctx.throw(422);
      }
    }
  }

  static async signIn(ctx: RouterContext) {
    const { email, password } = <SignInDto>ctx.request.body;
    const user = await User.findOne({ email }).select('+password').exec();
    if (!user) {
      ctx.throw(404, { errors: [`user with email ${email} does not exist`] });
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
        ctx.throw(401, { errors: ['incorrect password'] });
      }
    }
  }
}
