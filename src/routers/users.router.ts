import { UsersController } from '@/controllers/users.controller';
import Router from '@koa/router';

export const usersRouter = new Router({ prefix: '/users' });

usersRouter.post('/', UsersController.create);
