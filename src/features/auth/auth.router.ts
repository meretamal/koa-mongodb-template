import Router from '@koa/router';
import { object, string, ref } from 'yup';
import { AuthController } from '@/features/auth/auth.controller';
import { vaidateRequestBodyMiddleware } from '@/features/common/middlewares/validation/validate-request-body.middleware';
import { ISignInDto } from '@/interfaces/dtos/auth/sign-in.dto';
import { ISignUpDto } from '@/interfaces/dtos/auth/sign-up.dto';

export const authRouter = new Router({ prefix: '/auth' });

authRouter.post(
  '/sign-up',
  vaidateRequestBodyMiddleware<ISignUpDto>(
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
  vaidateRequestBodyMiddleware<ISignInDto>(
    object({
      email: string().email().required(),
      password: string().required(),
    }).strict(),
  ),
  AuthController.signIn,
);
