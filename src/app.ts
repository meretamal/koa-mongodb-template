import Koa from 'koa';
import { router } from './routers';

export const app = new Koa();

app.use(router.routes());
