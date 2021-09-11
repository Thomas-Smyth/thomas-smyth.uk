import Router from '@koa/router';
import Koa from 'koa';
import BodyParser from 'koa-bodyparser';

import { router as v1APIRouter } from './api/v1';
import { client } from './lib/database';

const app = new Koa();
const router = new Router();

// Setup middleware.
app.use(BodyParser());

// Setup routes.
router.get('/', (ctx) => {
  ctx.redirect('https://github.com/Thomas-Smyth/SquadJS');
});

router.get('/discord', (ctx) => {
  ctx.redirect('https://discord.gg/DjrpPuw');
});

router.use('/api/v1', v1APIRouter.routes());
router.use('/api/v1', v1APIRouter.allowedMethods());

// Apply the routes.
app.use(router.routes());
app.use(router.allowedMethods());

export const initSubdomain = async (): Promise<Koa> => {
  await client.connect();
  return app;
};
