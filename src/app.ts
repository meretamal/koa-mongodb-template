import Koa from 'koa';
import koaBody from 'koa-body';
import { router } from './routers';

export const app = new Koa();

app.use(koaBody());

app.use(router.routes());
