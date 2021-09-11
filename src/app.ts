import Cors from '@koa/cors';
import Koa from 'koa';
import Helmet from 'koa-helmet';
import Logger from 'koa-logger';

import { mountSubdomains } from './subdomains';

export const initApp = async (): Promise<Koa> => {
  const app = new Koa();

  // Apply generic middleware.
  app.use(Logger());
  app.use(Helmet());
  app.use(Cors());

  // Mount subdomain apps.
  await mountSubdomains(app);

  return app;
};
