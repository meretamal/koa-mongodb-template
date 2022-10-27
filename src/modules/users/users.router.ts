import Router from '@koa/router';
import { object, string } from 'yup';
import { UsersController } from '@/modules/users/users.controller';
import { vaidateRequestBodyMiddleware } from '@/shared/middlewares/validation/validate-request-body.middleware';
import { vaidateRequestParamsMiddleware } from '@/shared/middlewares/validation/validate-request-params.middleware';
import { findUserByIdMiddleware } from '@/modules/users/middlewares/find-user-by-id.middleware';
import { isCurrentUserMiddleware } from '@/shared/middlewares/authorization/is-current-user.middleware';
import { objectId } from '@/shared/yup/custom-schemas/object-id.schema';
import { IUpdateUserRequest } from './types/requests/update-user.request';

export const usersRouter = new Router({ prefix: '/users' });

usersRouter.get('/', UsersController.list);

usersRouter.get(
  '/:id',
  vaidateRequestParamsMiddleware<{ id: unknown }>(object({ id: objectId() })),
  findUserByIdMiddleware,
  UsersController.detail,
);

usersRouter.patch(
  '/:id',
  vaidateRequestParamsMiddleware<{ id: unknown }>(object({ id: objectId() })),
  vaidateRequestBodyMiddleware<IUpdateUserRequest>(
    object({
      name: string(),
      lastName: string(),
    })
      .strict()
      .noUnknown(),
  ),
  findUserByIdMiddleware,
  isCurrentUserMiddleware,
  UsersController.update,
);

usersRouter.del(
  '/:id',
  vaidateRequestParamsMiddleware<{ id: unknown }>(object({ id: objectId() })),
  findUserByIdMiddleware,
  isCurrentUserMiddleware,
  UsersController.delete,
);
