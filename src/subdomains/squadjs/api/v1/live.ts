import Koa from 'koa';

import { SquadJSInstances } from '../../lib/database';

export const live = async (ctx: Koa.BaseContext): Promise<void> => {
  const withinHours = ctx.request.query.withinHours ? parseInt(ctx.request.query.withinHours) : 1;

  ctx.body = {
    servers: await SquadJSInstances.countDocuments({
      lastPinged: { $gte: withinHours * 60 * 60 * 1000 },
    }),
    players: await (
      await SquadJSInstances.aggregate([
        {
          $match: { lastPinged: { $gte: withinHours * 60 * 60 * 1000 } },
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
