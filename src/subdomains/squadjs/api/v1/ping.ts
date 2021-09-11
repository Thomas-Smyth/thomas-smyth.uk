import Koa from 'koa';

import { SquadJSInstances } from '../../lib/database';

export const ping = async (ctx: Koa.BaseContext): Promise<void> => {
  // Get mandatory variables.
  const name = ctx.request.body.server?.name;

  // Check the mandatory variables are present.
  if (!name) {
    ctx.body = { error: 'Invalid ping.' };
    return;
  }

  // Save instance information.
  await SquadJSInstances.updateOne(
    { name },
    {
      $set: {
        host: ctx.request.body.server?.host,
        queryPort: ctx.request.body.server?.queryPort,
        playerCount: ctx.request.body.server?.playerCount,
        version: ctx.request.body.squadjs?.version,
        logReaderMode: ctx.request.body.squadjs?.logReaderMode,
        lastPinged: Date.now(),
      },
      $setOnInsert: {
        name,
        firstPinged: Date.now(),
      },
    },
    {
      upsert: true,
    }
  );

  // Respond
  ctx.body = { message: 'Pong.' };
};
