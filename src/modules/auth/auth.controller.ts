import { RouterContext } from '@koa/router';
import { ISignInDTO } from './dtos/sign-in.dto';
import { ISignUpDTO } from './dtos/sign-up.dto';
import { generateToken } from './utils/generate-token';
import { hashPassword } from './utils/hash-password';
import { comparePassword } from './utils/compare-password';
import { UsersRepository } from '../users/users.repository';

export class AuthController {
  static async signUp(ctx: RouterContext) {
    const { name, lastName, email, password } = <ISignUpDTO>ctx.request.body;
    const existingUser = await UsersRepository.findByEmail(email);
    if (existingUser) {
      ctx.throw(409, {
        errors: [`user with email ${email} already exists`],
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await UsersRepository.create({
        name,
        lastName,
        email,
        password: hashedPassword,
      });
      ctx.status = 201;
      ctx.body = user;
    }
  }

  static async signIn(ctx: RouterContext) {
    const { email, password } = <ISignInDTO>ctx.request.body;
    const user = await UsersRepository.findByEmail(email);
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
