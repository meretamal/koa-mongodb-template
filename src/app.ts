import Koa from 'koa';
import koaBody from 'koa-body';
import koaLogger from 'koa-logger';
import { router } from './routers';

export const app = new Koa();

app.use(koaBody());
app.use(koaLogger());

app.use(router.routes());
