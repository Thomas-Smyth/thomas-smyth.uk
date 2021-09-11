import Koa from 'koa';

export const ping = async (ctx: Koa.BaseContext): Promise<void> => {
  console.log(ctx.request.body);
  ctx.body = { message: 'Pong.' };
};
