import Router from '@koa/router';
import { object } from 'yup';
import { vaidateRequestBodyMiddleware } from '@/shared/middlewares/validation/validate-request-body.middleware';
import { vaidateRequestParamsMiddleware } from '@/shared/middlewares/validation/validate-request-params.middleware';
import { isCurrentUserMiddleware } from '@/shared/middlewares/authorization/is-current-user.middleware';
import { objectId } from '@/shared/yup/custom-schemas/object-id.schema';
import { UsersController } from './users.controller';
import { findUserByIdMiddleware } from './middlewares/find-user-by-id.middleware';
import { IUpdateUserDTO } from './dtos/update-user.dto';
import { udpateUserSchema } from './schemas/update-user.schema';

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
  vaidateRequestBodyMiddleware<IUpdateUserDTO>(
    udpateUserSchema.strict().noUnknown(),
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
