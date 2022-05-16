import { RouterContext } from '@koa/router';
import { User } from '@/database/models/user.model';
import { ISignInDto } from '@/interfaces/dtos/auth/sign-in.dto';
import { ISignUpDto } from '@/interfaces/dtos/auth/sign-up.dto';
import { generateToken } from '@/modules/auth/utils/generate-token';
import { addSendEmailJob } from '@/jobs/send-email/send-email.job';
import { environment } from '@/config/environment';

export class AuthController {
  static async signUp(ctx: RouterContext) {
    const { name, lastName, email, password } = <ISignUpDto>ctx.request.body;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      ctx.throw(409, {
        errors: [`user with email ${email} already exists`],
      });
    } else {
      const user = new User({ name, lastName, email, password });
      try {
        await user.save();
        addSendEmailJob({
          receptant: email,
          subject: `Welcome to ${environment.app.name}`,
          template: 'sign-up',
          data: { name, lastName },
        });
        ctx.status = 201;
        ctx.body = user;
      } catch (error) {
        ctx.throw(422);
      }
    }
  }

  static async signIn(ctx: RouterContext) {
    const { email, password } = <ISignInDto>ctx.request.body;
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
