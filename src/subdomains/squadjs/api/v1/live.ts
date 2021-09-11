import Koa from 'koa';

export const live = async (ctx: Koa.BaseContext): Promise<void> => {
  ctx.body = { servers: null, players: null };
};
