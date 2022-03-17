import Router from '@koa/router';
import { object, string } from 'yup';
import { AuthController } from '@/controllers/auth.controller';
import { vaidateRequestBodyMiddleware } from '@/middlewares/validation/validate-request-body.middleware';
import { SignInDto } from '@/interfaces/dtos/auth/sign-in.dto';

export const authRouter = new Router({ prefix: '/auth' });

authRouter.post(
  '/sign-in',
  vaidateRequestBodyMiddleware<SignInDto>(
    object({
      email: string().email().required(),
      password: string().required(),
    }).strict(),
  ),
  AuthController.signIn,
);
