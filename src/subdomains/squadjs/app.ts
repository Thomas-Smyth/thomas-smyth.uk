import Koa from 'koa';
import Router from '@koa/router';

export const initSubdomain = (): Koa => {
  const app = new Koa();
  const router = new Router();

  router.get('/', (ctx) => {
    ctx.redirect('https://github.com/Thomas-Smyth/SquadJS');
  });

  router.get('/discord', (ctx) => {
    ctx.redirect('https://discord.gg/DjrpPuw');
  });

  // Define a mock route temporarily.
  router.post('/api/v1/ping', (ctx) => {
    ctx.body = { message: 'Pong.' };
  });

  // Apply the routes.
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
};
