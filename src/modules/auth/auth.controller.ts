import { RouterContext } from '@koa/router';
import { prisma } from '@/prisma/client.prisma';
import { ISignInRequest } from './types/requests/sign-in.request';
import { ISignUpRequest } from './types/requests/sign-up.request';
import { generateToken } from './utils/generate-token';
import { hashPassword } from './utils/hash-password';
import { comparePassword } from './utils/compare-password';

export class AuthController {
  static async signUp(ctx: RouterContext) {
    const { name, lastName, email, password } = <ISignUpRequest>(
      ctx.request.body
    );
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
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: { name, lastName, email, password: hashedPassword },
      });
      ctx.status = 201;
      ctx.body = user;
    }
  }

  static async signIn(ctx: RouterContext) {
    const { email, password } = <ISignInRequest>ctx.request.body;
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
