import Koa from 'koa';
import { router } from './routes';

export const app = new Koa();

app.use(router.routes());
