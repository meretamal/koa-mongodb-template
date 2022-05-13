import Router from '@koa/router';
import { object, string } from 'yup';
import { UsersController } from '@/features/users/users.controller';
import { vaidateRequestBodyMiddleware } from '@/middlewares/validation/validate-request-body.middleware';
import { vaidateRequestParamsMiddleware } from '@/middlewares/validation/validate-request-params.middleware';
import { findUserByIdMiddleware } from '@/middlewares/users/find-user-by-id.middleware';
import { isCurrentUserMiddleware } from '@/middlewares/authorization/is-current-user.middleware';
import { IUpdateUserDto } from '@/interfaces/dtos/users/update-user.dto';
import { objectId } from '@/utils/yup/custom-schemas/object-id.schema';

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
  vaidateRequestBodyMiddleware<IUpdateUserDto>(
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
