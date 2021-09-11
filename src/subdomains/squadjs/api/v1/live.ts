import Koa from 'koa';

import { SquadJSInstances } from '../../lib/database';

export const live = async (ctx: Koa.BaseContext): Promise<void> => {
  ctx.body = {
    servers: await SquadJSInstances.countDocuments(),
    players: await (
      await SquadJSInstances.aggregate([
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
