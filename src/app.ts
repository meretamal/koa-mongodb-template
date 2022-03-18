import Koa from 'koa';
import koaBody from 'koa-body';
import koaCors from '@koa/cors';
import koaLogger from 'koa-logger';
import { router } from './routers';

export const app = new Koa();

app.use(koaBody());
app.use(koaCors());
app.use(koaLogger());

app.use(router.routes());
