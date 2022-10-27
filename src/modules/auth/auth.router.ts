import Router from '@koa/router';
import { object, string, ref } from 'yup';
import { AuthController } from '@/modules/auth/auth.controller';
import { vaidateRequestBodyMiddleware } from '@/shared/middlewares/validation/validate-request-body.middleware';
import { ISignInRequest } from './types/requests/sign-in.request';
import { ISignUpRequest } from './types/requests/sign-up.request';

export const authRouter = new Router({ prefix: '/auth' });

authRouter.post(
  '/sign-up',
  vaidateRequestBodyMiddleware<ISignUpRequest>(
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
  vaidateRequestBodyMiddleware<ISignInRequest>(
    object({
      email: string().email().required(),
      password: string().required(),
    }).strict(),
  ),
  AuthController.signIn,
);
