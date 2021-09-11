import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';

export const initSubdomain = (): Koa => {
  const app = new Koa();

  // Serve content.
  app.use(serve(path.join(__dirname, './content'), { extensions: ['html'] }));

  return app;
};
