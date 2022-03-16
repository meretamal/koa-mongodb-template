import Router from '@koa/router';
import { object, string } from 'yup';
import { UsersController } from '@/controllers/users.controller';
import { vaidateRequestBodyMiddleware } from '@/middlewares/validation/validate-request-body.middleware';
import { vaidateRequestParamsMiddleware } from '@/middlewares/validation/validate-request-params.middleware';
import { findUserByIdMiddleware } from '@/middlewares/users/find-user-by-id.middleware';
import { CreateUserDto } from '@/interfaces/dtos/users/create-user.dto';
import { objectId } from '@/utils/yup/custom-schemas/object-id.schema';

export const usersRouter = new Router({ prefix: '/users' });

usersRouter.post(
  '/',
  vaidateRequestBodyMiddleware<CreateUserDto>(
    object({
      name: string().required(),
      lastName: string().required(),
      email: string().email().required(),
      password: string().required(),
    }).strict(),
  ),
  UsersController.create,
);
usersRouter.get('/', UsersController.list);
usersRouter.get(
  '/:id',
  vaidateRequestParamsMiddleware<{ id: unknown }>(object({ id: objectId() })),
  findUserByIdMiddleware,
  UsersController.detail,
);
