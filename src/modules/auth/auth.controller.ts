import { RouterContext } from '@koa/router';
import { ISignInDto } from '@/interfaces/dtos/auth/sign-in.dto';
import { ISignUpDto } from '@/interfaces/dtos/auth/sign-up.dto';
import { generateToken } from '@/modules/auth/utils/generate-token';
import { addSendEmailJob } from '@/jobs/send-email.job';
import { environment } from '@/config/environment';
import { prisma } from '@/prisma/client.prisma';
import { hashPassword } from './utils/hash-password';
import { comparePassword } from './utils/compare-password';

export class AuthController {
  static async signUp(ctx: RouterContext) {
    const { name, lastName, email, password } = <ISignUpDto>ctx.request.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      ctx.throw(409, {
        errors: [`user with email ${email} already exists`],
      });
    } else {
      try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
          data: { name, lastName, email, password: hashedPassword },
        });
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
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      ctx.throw(404, { errors: [`user with email ${email} does not exist`] });
    } else {
      const doPasswordsMatch = await comparePassword(password, user.password);
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
