import Router from '@koa/router';
import { object, string, ref } from 'yup';
import { AuthController } from '@/controllers/auth.controller';
import { vaidateRequestBodyMiddleware } from '@/middlewares/validation/validate-request-body.middleware';
import { SignInDto } from '@/interfaces/dtos/auth/sign-in.dto';
import { SignUpDto } from '@/interfaces/dtos/auth/sign-up.dto';

export const authRouter = new Router({ prefix: '/auth' });

authRouter.post(
  '/sign-up',
  vaidateRequestBodyMiddleware<SignUpDto>(
    object({
      name: string().required(),
      lastName: string().required(),
      email: string().email().required(),
      password: string().required(),
      confirmPassword: string()
        .required()
        .oneOf([ref('password'), null], "passwords don't match"),
    }).strict(),
  ),
  AuthController.signUp,
);

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
