import Koa from 'koa';

import { SquadJSInstances } from '../../lib/database';

export const live = async (ctx: Koa.BaseContext): Promise<void> => {
  const withinHours = ctx.request.query.withinHours ? parseInt(ctx.request.query.withinHours) : 1;

  const afterDate = new Date();
  afterDate.setHours(afterDate.getHours() - withinHours);


  ctx.body = {
    servers: await SquadJSInstances.countDocuments({
      lastPinged: { $gte: afterDate },
    }),
    players: await (
      await SquadJSInstances.aggregate([
        {
          $match: { lastPinged: { $gte: afterDate } },
        },
        {
          $group: {
            _id: '',
            playerCount: { $sum: '$playerCount' },
          },
        },
      ]).toArray()
    )[0]?.playerCount,
  };
};
